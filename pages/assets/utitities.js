import { PermissionsAndroid, alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';


export const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Location permission',
                'message': 'Geotrasher needs access to your location'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
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

export const checkLocationPermission = async () => {
    try {

        const hasFineLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        const hasCoarseLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
        console.log("hasFineLocationPermission: ", hasFineLocationPermission);
        console.log("hasCoarseLocationPermission", hasCoarseLocationPermission);
        const result = hasFineLocationPermission && hasCoarseLocationPermission;
        return result
    }
    catch (err) {
        console.warn(err)
    }

}

export const getCurrentPosition = async (hasLocationPermission, successFunction) => {
    console.log("getCurrentPosition, has permission: ", hasLocationPermission)
    let position = { latitude: null, longitude: null, timestamp: null };
    if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
            // onSuccess: 
            (position) => successFunction(position),
            // (pos) => {
            //     console.log("got pos", pos);
            //     position = {
            //         longitude: pos.coords.longitude,
            //         latitude: pos.coords.latitude,
            //         timestamp: pos.timestamp
            //     };
            //     console.log("returning position")
            //     return position
            // },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
}


// export const getCurrentPosition = (hasLocationPermission) => {
//     console.log("")
//     if (hasLocationPermission) {
//         Geolocation.getCurrentPosition(
//             (position) => {
//                 console.log(position);
//             },
//             (error) => {
//                 // See error code charts below.
//                 console.log(error.code, error.message);
//             },
//             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//     }
// }
