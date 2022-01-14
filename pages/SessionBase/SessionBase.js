import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Button, Menu } from 'react-native-paper';
import Colors from "../assets/Colors";
import KeyEvent from 'react-native-keyevent';

import realm, {
    addItemToSession, updateItemSumsAndTotalById, popLastItem,
    setSessionNameById, getLatestSession, setActiveSession, getSessionById
} from "../realmSchemas";
import { checkLocationPermission, requestLocationPermission, getCurrentPosition } from "../assets/utilities";
import images from '../assets/images'

//Session user interfaces
import SessionLookVertical from './SessionLookVertical'
import SessionLeftScroll from './SessionLeftScroll';
import SessionWithRotation from './SessionWithRotation'
import SessionButtonTop from "./SessionButtonTop";
import SessionScroll from "./SessionScroll";

//Modals
import SettingsModal from "./components/SettingsModal";
import StartModal from './components/StartModal';

// SessionBase should handle logic, but nothing of how it looks. All Looks should be imported. 

// TODO: get user settings

const MenuStuff = ({ undoLastItem, showSettings, endSession, printSession }) => {
    const [visible, setVisible] = useState(false)

    return (
        <View>
            <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={<Button onPress={setVisible}>Show menu</Button>}>
                <Menu.Item icon='check-decagram' onPress={() => { endSession() }} title="End session" />
                <Menu.Item icon='cog' onPress={() => {
                    showSettings()
                    setVisible(false)
                }
                } title="Settings" />
                <Menu.Item icon='undo' onPress={() => { undoLastItem() }} title="Undo item" />
                <Menu.Item icon='stop' onPress={() => { printSession() }} title="Print Session" />
            </Menu>
        </View >
    );
}


const availableViews = {
    SessionLookVertical: "SessionLookVertical",
    SessionLeftScroll: "SessionLeftScroll",
    SessionWithRotation: "SessionWithRotation",
    SessionButtonTop: "SessionButtonTop",
    SessionScroll: "SessionScroll",
}
availableViews.default = availableViews.SessionButtonTop

const defaultItems = [
    { name: 'nicotine', color: 'red', value: 0, image: images.nicotine },
    { name: 'plastic', color: 'blue', value: 0, image: images.plastic },
    { name: 'paper', color: 'orange', value: 0, image: images.paper },
    { name: 'metal', color: 'beige', value: 0, image: images.metal },
    { name: 'food', color: 'olive', value: 0, image: images.food },
    { name: 'glass', color: 'aqua', value: 0, image: images.glass },
    { name: 'other', color: 'purple', value: 0, image: images.other },
]

const mapItemSumToItemList = (itemSum) => {

    const itemList = Object.entries(itemSum).map(([name, value]) => {
        const image = images[name] ? images[name] : images.other;

        return { name, value, image, color: 'red' }
    })

    return itemList;
}

class SessionBase extends React.Component {
    constructor(props) {
        super(props);
        const itemList = props.itemList || defaultItems;

        this.state = {
            view: "SessionButtonTop",
            clickerTime: 600,
            hasLocationPermission: null,
            multiClickTimer: null,
            timerRunning: false,
            totalCount: 0,
            multiClickCount: 0,
            keyCode: null,
            items: itemList,
            sessionId: 0,
            showSettings: false,
            showStartModal: false,
            countingPushes: false,
        }
    }

    menuStuff = () => {
        return <MenuStuff
            onDismiss={this.hideMenu}
            showMenu={this.showMenu}
            undoLastItem={this.undoLastItem}
            showSettings={this.showSettings}
            endSession={this.endSession}
            printSession={this.printSession}
        ></MenuStuff>

    }

    printSession = () => {
        const session = getSessionById(this.state.sessionId)
        console.log("Print Session: ", session)
    }

    showMenu = () => {
        this.setState({ showMenu: true })
    }

    hideMenu = () => {
        this.setState({ showMenu: false })
    }

    showSettings = () => {
        this.setState({ showSettings: true })
    }

    hideSettings = () => {
        this.setState({ showSettings: false })
    }

    hideStartModal = () => {
        this.setState({ showStartModal: false })
    }

    startSession = () => {
        this.hideStartModal()
        setActiveSession(true)
        this.setState({ countingPushes: true })
    }

    endSession = () => {
        this.hideMenu();
        setActiveSession(false)
        this.props.navigation.navigate("MapsPage", { sessionId: this.state.sessionId });
    }

    setSessionName = (sessionName) => {
        setSessionNameById(this.state.sessionId, sessionName);
    }

    setClickerTime = (timeInMs) => {
        this.setState({ clickerTime: timeInMs })
    }

    getView = () => {
        switch (this.state.view) {
            case "SessionLookVertical":
                return (<SessionLookVertical
                    itemList={this.state.items}
                    counterPress={this.counterPress}
                    totalCount={this.state.totalCount}
                    multiClickCount={this.state.multiClickCount}
                    undoLastItem={this.undoLastItem}

                />)
            case "SessionLeftScroll":
                return <SessionLeftScroll />
            case "SessionWithRotation":
                return (<SessionWithRotation
                    multiClickCount={this.state.multiClickCount}
                    itemList={this.state.items}
                    counterPress={this.counterPress}
                    totalCount={this.state.totalCount}
                    undoLastItem={this.undoLastItem}
                />)
            case "SessionButtonTop":
                return (<SessionButtonTop
                    multiClickCount={this.state.multiClickCount}
                    itemList={this.state.items}
                    counterPress={this.counterPress}
                    totalCount={this.state.totalCount}
                    undoLastItem={this.undoLastItem}
                />)
            case "SessionScroll":
                return (<SessionScroll
                    itemList={this.state.items}
                    totalCount={this.state.totalCount}
                    increment={this.incrementItemCountByName}
                    undoLastItem={this.undoLastItem}
                />)
            default:
                console.log("Default view");
                return (<SessionButtonTop
                    multiClickCount={this.state.multiClickCount}
                    itemList={this.state.items}
                    counterPress={this.counterPress}
                    totalCount={this.state.totalCount}
                    undoLastItem={this.undoLastItem}
                />)
        }
    }

    setView = async (viewName) => {
        Object.keys(availableViews).forEach(name => {
            if (viewName === name) {
                console.log("Set view:", availableViews[viewName])
                this.setState({ view: availableViews[viewName] })
                return
            }
        })
        // this.setState({ view: availableViews.default })
    }

    componentDidMount() {

        this.setView("")

        this.props.navigation.setOptions({
            headerRight: () => this.menuStuff()
        })

        this.initializeLocationPermission();

        KeyEvent.onKeyUpListener((keyEvent) => {
            // console.log(`onKeyUp keyCode: ${keyEvent.keyCode}`)
        })

        KeyEvent.onKeyDownListener((keyEvent) => {
            // console.log(`onKeyDown keyCode: ${keyEvent.keyCode}`);
            // console.log(`Action: ${keyEvent.action}`);
            // console.log(`Key: ${keyEvent.pressedKey}`);
            // console.log("KeyDownTimerRunning?", this.state.timerRunning)
            this.counterPress()
        });
        if (this.props.route.params.activeSession) {
            // get latest session
            this.useExistingSession();
        }
        else {

            this.createSessionInRealm();
        }
    }

    useExistingSession = () => {
        // Transform itemSum to itemList
        const session = getLatestSession()
        const itemList = mapItemSumToItemList(session.itemSum)
        this.setState({ sessionId: session.session_id, items: itemList, totalCount: session.itemCount })
    }



    createSessionInRealm = async () => {
        // Create session add to realm
        let id = 0;
        const length = realm.objects('session_details').length
        if (length) {
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
        this.setState({ showStartModal: true })
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
        } catch (err) {
            console.warn(`Failed to get location permission, ${err}`)
        }

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

        // Check location permission
        if (!this.state.hasLocationPermission) {
            try {
                const permission = await requestLocationPermission()
                if (!permission) {
                    // Don't continue without permission'¨
                    console.warn("Does not have location permission")
                    return
                }
            } catch (err) {
                console.warn(err)
            }
        }

        // this function is supposed to chain with Geolocation.getCurrentPosition
        // Which on success expects a function that takes position as argument. 
        const storeItemWithPosition = async (position) => {
            try {

                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timestamp: position.timestamp
                }
                // Store item in database
                try {

                    await addItemToSession(this.state.sessionId, { name: name, location: location });
                } catch (error) {
                    console.error("Fail add Item to session in realm")
                    console.log(error)
                }

                try {

                    // // itemList
                    let itemSums = {}
                    const itemList = this.state.items
                    itemList.forEach(item => {
                        itemSums[item.name] = item.value
                    })

                    await updateItemSumsAndTotalById(this.state.sessionId, itemSums, this.state.totalCount)
                } catch (error) {
                    console.error("Fail update items sums in realm")
                    console.log(error)
                }

            } catch (error) {
                console.error; ("Failed to store item")
                console.log(error)
            }
        }

        // Chain function in position function
        try {
            getCurrentPosition(this.state.hasLocationPermission, storeItemWithPosition)
        } catch (error) {
            console.error("Fail getCurrentPosition")
            console.log(error)
        }
        // // Might be good to turn into a promise, but I am not too sure how to do that

    }

    undoLastItem = async () => {
        if (this.state.totalCount <= 0) {
            return
        }

        let lastItem;
        try {
            lastItem = await popLastItem(this.state.sessionId);
        } catch (error) {
            console.error("Fail popLastItem from session in realm")
            console.log(error)
        }

        // Update item sums
        let itemSums = {}
        let tmpItems = [...this.state.items];
        tmpItems.forEach(item => {
            // Update state if match
            if (item.name === lastItem.name) {
                item.value -= 1
                this.setState({ items: tmpItems, totalCount: this.state.totalCount - 1 })
            }
            // Update sums object
            itemSums[item.name] = item.value
        })

        try {
            await updateItemSumsAndTotalById(this.state.sessionId, itemSums, this.state.totalCount)
        } catch (error) {
            console.error("Fail update items sums in realm")
            console.log(error)
        }
    }






    incrementItemCountFromMultiClick = async () => {
        // Update item counts in state
        // is there an alternative when you update from a button push?

        // new implementation
        const index = (this.state.multiClickCount - 1) % this.state.items.length;
        this.incrementItemCountFromIndex(index)
    }

    incrementItemCountFromIndex = (index) => {
        let tmpItems = [...this.state.items];
        tmpItems[index].value += 1
        this.setState({ items: tmpItems })
        this.setState({ totalCount: this.state.totalCount + 1 })
    }

    incrementItemCountByName = (itemName) => {
        // Find index of item name by name
        let tmpItems = [...this.state.items];
        for (let item of tmpItems) {
            if (item.name === itemName) {
                item.value += 1
                this.setState({ items: tmpItems, totalCount: this.state.totalCount + 1 })
                return
            }
        }
        console.error("Error in incrementItemCountByName")
        console.log(`Name: '${itemName}' did not match any item in item list`)

    }

    onTimeOut = () => {
        console.log("Time's up")
        this.incrementItemCountFromMultiClick()


        // Store new item
        let index = (this.state.multiClickCount - 1) % this.state.items.length;
        const name = this.state.items[index].name
        this.storeNewItem({ name }).catch(err => console.log(err));

        // Reset counters
        this.setState({
            timerRunning: false,
            multiClickCount: 0
        });
    }



    counterPress = () => {
        if (this.state.timerRunning) {
            clearTimeout(this.state.multiClickTimer);
            this.setState({ multiClickTimer: null })
        }

        this.setState({
            multiClickCount: this.state.multiClickCount + 1,
            multiClickTimer: setTimeout(this.onTimeOut, this.state.clickerTime),
            timerRunning: true
        })
    }

    checkLocationIsRight = () => {
        checkLocationPermission();
    }

    render() {
        return (
            <SafeAreaView>
                {
                    this.getView()
                }
                {this.state.showStartModal ? <StartModal
                    visible={this.state.showStartModal}
                    onDismiss={this.startSession}
                    sessionId={this.state.sessionId}
                    setSessionName={this.setSessionName}
                /> : null}
                <SettingsModal
                    visible={this.state.showSettings}
                    onDismiss={() => this.hideSettings()}
                    // Settable stuff
                    clickerTime={{ current: this.state.clickerTime, set: this.setClickerTime }}
                    views={{ available: availableViews, selected: this.state.view, set: (value) => this.setView(value) }}

                />
            </SafeAreaView >
        )
    }
}


export default SessionBase;
