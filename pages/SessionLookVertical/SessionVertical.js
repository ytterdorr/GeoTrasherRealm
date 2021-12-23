import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Alert, Title } from "react-native";
import Colors from "../assets/Colors";
import ItemsCounter from "./ItemsCounter";
import KeyEvent from 'react-native-keyevent';
import ItemCarousel from './ItemCarousel';

import realm, { addItemToSession, updateItemSumsAndTotalById } from "../realmSchemas";
import { checkLocationPermission, requestLocationPermission, getCurrentPosition } from "../assets/utilities";

// Byt ut itemCounts på följande ställen:

const styles = StyleSheet.create({
    body: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    welcomeText: {
        color: Colors.primary
    },
    button: {
        backgroundColor: Colors.green,
        color: "white",
        borderRadius: 5,
        padding: 10
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    }

});

class SessionVertical extends React.Component {
    constructor(props) {
        super(props);
        const itemList = [
            { name: 'nicotine', color: 'red', value: 0 },
            { name: 'plastic', color: 'blue', value: 0 },
            { name: 'paper', color: 'orange', value: 0 },
            { name: 'food', color: 'olive', value: 0 },
            { name: 'glass', color: 'aqua', value: 0 },
            { name: 'other', color: 'purple', value: 0 },
        ]

        this.state = {
            hasLocationPermission: null,
            multiClickTimer: null,
            timerRunning: false,
            totalCount: 0,
            multiClickCount: 0,
            keyCode: null,
            items: itemList,
            sessionId: 0
        }
    }

    createSessionInRealm = async () => {
        // Create session add to realm
        let id = 0;
        const length = realm.objects('session_details').length
        if (length) {
            console.log("Got length", length);
            const realmObjs = realm.objects('session_details');
            id = await realm.objects('session_details').sorted('session_id', true)[0].session_id + 1
        }

        this.setState({ sessionId: id });
        realm.write(() => {
            realm.create('session_details', {
                session_id: id,
                session_name: `Session ${id}`,
                itemCount: 0
            });
        });

        // Show the user that session is created
        Alert.alert('Success', `New session with id: ${this.state.sessionId}`, [
            {
                text: 'Ok',
            }
        ],
            { cancelable: true });
    }

    initializeLocationPermission = async () => {
        // Check location permission
        try {
            let locationPermission = await checkLocationPermission();
            if (!locationPermission) {
                try {
                    locationPermission = await requestLocationPermission();
                } catch (err) {
                    console.warn(err)
                }
            }
            this.setState({ hasLocationPermission: locationPermission })
            console.log("state.hasLocationPermission", this.state.hasLocationPermission)
        } catch (err) {
            console.warn(`Failed to get location permission, ${err}`)
        }

    }
    componentDidMount() {

        this.initializeLocationPermission();

        KeyEvent.onKeyUpListener((keyEvent) => {
            console.log(`onKeyUp keyCode: ${keyEvent.keyCode}`)
            console.log("KeyUpTimerRunning?", this.state.timerRunning)
            this.onPress()
        })

        KeyEvent.onKeyDownListener((keyEvent) => {
            console.log(`onKeyDown keyCode: ${keyEvent.keyCode}`);
            console.log(`Action: ${keyEvent.action}`);
            console.log(`Key: ${keyEvent.pressedKey}`);
        });
        this.createSessionInRealm();
    }

    componentWillUnmount() {
        // if you are listening to keyDown
        KeyEvent.removeKeyDownListener();

        // if you are listening to keyUp
        KeyEvent.removeKeyUpListener();

        // if you are listening to keyMultiple
        // KeyEvent.removeKeyMultipleListener();
    }

    // Need to do function chaining because of silly Geolocation package?
    storeNewItem = async ({ name }) => {
        if (!this.state.hasLocationPermission) {
            try {
                const permission = await requestLocationPermission()
                if (!permission) {
                    // Don't continue without permission
                    return
                }
            } catch (err) {
                console.warn(err)
            }
        }

        // this function is supposed to chain with Geolocation.getCurrentPosition
        // Which on success expects a function that takes position as argument. 
        const storeItemWithPosition = async (position) => {
            console.log(position)
            const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: position.timestamp
            }
            // Store item in database
            try{

                await addItemToSession(this.state.sessionId, { name: name, location: location });
            } catch (error) {
                console.log("Fail add Item to session in realm")
                console.log(error)
            }

            // // itemList
            let itemSums = {}
            const itemList = this.state.items
            itemList.forEach(item => {
                itemSums[item.name]= item.value
            })
            
            try {
                await updateItemSumsAndTotalById(this.state.sessionId, itemSums, this.state.totalCount)
            } catch (error) {
                console.log("Fail update items sums in realm")
                console.log(error)
            }
        }

        // Chain function in position function
        try {
            getCurrentPosition(this.state.hasLocationPermission, storeItemWithPosition)
        } catch (error) {
            console.log("Fail getCurrentPosition")
            console.log(error)
        }
        // Might be good to turn into a promise, but I am not too sure how to do that

    }


    updateItemCount = async () => {
        // Update item counts in state
        // is there an alternative when you update from a button push?
        
        // new implementation
        let index = (this.state.multiClickCount - 1) % this.state.items.length;
        console.log(index)
        this.state.items[index].value += 1;
        this.setState({items: this.state.items})
    }

    onTimeOut = () => {
        console.log("Time's up")
        this.updateItemCount(this.state.multiClickCount)
        

        // Store new item
        let index = (this.state.multiClickCount - 1) % this.state.items.length;
        console.log("index onTimeOut", index)
        const name = this.state.items[index].name
        this.storeNewItem({ name }).catch(err => console.log(err));    

        

        // Reset counters
        this.setState({
            timerRunning: false,
            totalCount: this.state.totalCount + 1,
            multiClickCount: 0
        });
    }



    onPress = () => {
        // console.log("timerRunning?", this.state.timerRunning);
        if (this.state.timerRunning) {
            clearTimeout(this.state.multiClickTimer);
            this.setState({ multiClickTimer: null })
        }

        this.setState({
            multiClickCount: this.state.multiClickCount + 1,
            multiClickTimer: setTimeout(this.onTimeOut, 500),
            timerRunning: true
        })
        console.log("Pressed Button")
    }

    checkLocationIsRight = () => {
        console.log("state has permission?", this.state.hasLocationPermission)
        checkLocationPermission();
    }

    render() {  
        return (
            <SafeAreaView>
                <View style={styles.body}>
                   <ItemCarousel
                        itemList={this.state.items}
                        multiClickCount={this.state.multiClickCount}
                    ></ItemCarousel>
                    <Text>Total: {this.state.totalCount}</Text>
                    <ItemsCounter
                        itemList={this.state.items}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPress}
                    >
                        <Text style={styles.buttonText}>
                            Count some pushes
                        </Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView >
        )
    }
}




export default SessionVertical;
