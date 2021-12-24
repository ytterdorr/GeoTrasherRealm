import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Alert } from "react-native";
import Colors from "./assets/Colors";
import ItemsCounter from "./components/ItemsCounter";
import KeyEvent from 'react-native-keyevent';

import realm, { addItemToSession, updateItemSumsAndTotalById } from "./realmSchemas";
import { checkLocationPermission, requestLocationPermission, getCurrentPosition } from "./assets/utilities";

import ItemCarousel from './components/ItemCarousel';

class SessionWithRotation extends React.Component {
    constructor(props) {
        super(props);

        let items = ["nicotine", "plastic", "other"]
        let itemCounts = {}
        for (let item of items) {
            itemCounts[item] = 0;
        }

        this.state = {
            hasLocationPermission: null,
            multiClickTimer: null,
            timerRunning: false,
            count: 0,
            multiClickCount: 0,
            keyCode: null,
            items: items,
            itemCounts: itemCounts,
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
            console.log("realmObjs", realmObjs);
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
            console.log("locationPermission1", locationPermission)
            if (!locationPermission) {
                try {
                    locationPermission = await requestLocationPermission();
                } catch (err) {
                    console.warn(err)
                }
            }
            console.log("locationPermission2", locationPermission)
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

            const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: position.timestamp
            }
            // Store item in database
            await addItemToSession(this.state.sessionId, { name: name, location: location });
            await updateItemSumsAndTotalById(this.state.sessionId, this.state.itemCounts, this.state.count)
        }

        // Chain function in position function
        getCurrentPosition(this.state.hasLocationPermission, storeItemWithPosition)
        // Might be good to turn into a promise, but I am not too sure how to do that

    }

    getItemNameFromMultiClick = () => {

        // let multiClickCount = this.state.multiClickCount % this.state.items.length;

        // if (multiClickCount > this.state.items.length) {
        //     multiClickCount = this.state.items.length
        // }

        let index = (this.state.multiClickCount - 1) % this.state.items.length;
        let selectedItem = this.state.items[index];
        return selectedItem
    }



    updateItemCount = async () => {
        // Update item counts in state
        const selectedItem = this.getItemNameFromMultiClick();
        let itemCounts = this.state.itemCounts;
        itemCounts[selectedItem] += 1;
        console.log("ItemCounts in updateItemCount: ", itemCounts)
        this.setState({ itemCounts: itemCounts })
    }

    onTimeOut = () => {
        console.log("Time's up")
        console.log("timer: " + this.state.multiClickTimer);
        this.updateItemCount(this.state.multiClickCount)

        // Store new item
        const name = this.getItemNameFromMultiClick()
        this.storeNewItem({ name });

        // Reset counters
        this.setState({
            timerRunning: false,
            count: this.state.count + 1,
            multiClickCount: 0
        });
    }



    onPress = () => {
        console.log("timerRunning?", this.state.timerRunning);
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
                    <ItemsCounter
                        itemList={this.state.items}
                        itemCounts={this.state.itemCounts} />
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

export default SessionWithRotation;
