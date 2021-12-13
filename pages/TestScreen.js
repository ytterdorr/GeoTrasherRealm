import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: "black",
        padding: 5,
        color: "white",
        backgroundColor: "red"
    }
})

export async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Example App',
                'message': 'Example App access to your location '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
            alert("You can use the location");
            return true
        } else {
            console.log("location permission denied")
            alert("Location permission denied");
            return false
        }
    } catch (err) {
        console.warn(err)
    }
}

class TestScreenClass extends React.Component {
    constructor(props) {
        super(props)
    }

    getGeoPosition = () => {
        console.log("About to get geo position");
    }

    checkLocationPermission = async () => {
        try {

            const hasFineLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            const hasCoarseLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
            console.log("hasFineLocationPermission: ", hasFineLocationPermission);
            console.log("hasCoarseLocationPermission", hasCoarseLocationPermission);
            return hasFineLocationPermission && hasCoarseLocationPermission;
        }
        catch (err) {
            console.warn(err)
        }
    }

    componentDidMount = async () => {
        const hasLocationPermission = this.checkLocationPermission;
        if (!hasLocationPermission) {
            console.log("Some kind of trouble")
        }
        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }

    }

    render() {
        return (
            <View>
                <Text>This is TestScreenClass</Text>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text>Get Geoposition</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const TestScreenFunc = () => {
    const [hasLocationPermission, setLocationPermission] = useState(false);
    const [location, setLocation] = useState({});
    const [timesClicked, setTimesClicked] = useState(0)

    const checkLocationPermission = async () => {

    }

    // const requestLocationPermission = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //             {
    //                 title: "Location Permission",
    //                 message:
    //                     "Geolocation is needed for locating the trash",
    //                 buttonNeutral: "Ask Me Later",
    //                 buttonNegative: "Cancel",
    //                 buttonPositive: "OK"
    //             }
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log("Location permitted");
    //         } else {
    //             console.log("Location denied");
    //         }

    //         const granted2 = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    //             {
    //                 title: "Location Permission",
    //                 message:
    //                     "Geolocation is needed for locating the trash",
    //                 buttonNeutral: "Ask Me Later",
    //                 buttonNegative: "Cancel",
    //                 buttonPositive: "OK"
    //             }
    //         );
    //         if (granted2 === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log("Location permitted");
    //         } else {
    //             console.log("Location denied");
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // };

    const getLocationPermission = async () => {
        const hasFineLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        const hasCoarseLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
        console.log("hasFineLocationPermission: ", hasFineLocationPermission);
        console.log("hasCoarseLocationPermission", hasCoarseLocationPermission);
        const result = hasFineLocationPermission && hasCoarseLocationPermission;
        console.log("result", result)

        if (result === true) {
            setLocationPermission(true)
        }

        return result;
    }

    useEffect(() => {
        const hasLocationPermission = getLocationPermission();
        console.log("HasLocationPermission: ", hasLocationPermission);
        if (!hasLocationPermission) {
            console.log("Some kind of trouble?")
        } else {
            console.log("Do something with location")
        }
    })

    const getLocation = async () => {
        try {
            if (!hasLocationPermission) {
                const gotPermission = await requestLocationPermission()
                if (!gotPermission) {
                    return
                }
            }
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    setLocation({
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                        timestamp: position.timestamp
                    })
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } catch (err) {
            console.warn(err)
        }

        setTimesClicked(timesClicked + 1)
        console.log(timesClicked)


    }


    return (
        <View>
            <Text>This is Func test screen</Text>
            <Text>{`Times clicked: ${timesClicked}`}</Text>
            <Button
                title="Get Position"
                onPress={getLocation}
            ></Button>
            {location.longitude ?
                <View>
                    <Text>{`longitude ${location.longitude}`}</Text>
                    <Text>{`latitude ${location.latitude}`}</Text>
                    <Text>{`timestamp ${new Date(location.timestamp).toString()}`}</Text>
                </View>
                : null}
        </View>
    )
}



export default TestScreenFunc;