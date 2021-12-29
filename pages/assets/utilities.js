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
        const result = hasFineLocationPermission && hasCoarseLocationPermission;
        return result
    }
    catch (err) {
        console.warn(err)
    }

}

export const getCurrentPosition = async (hasLocationPermission, successFunction) => {
    if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
            // onSuccess: 
            (position) => successFunction(position),
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000, distanceFilter: 2 }
        );
    }
}

export const getFormattedDateFromTimestamp = (timestamp) => {
    let date = new Date(timestamp)
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset * 60 * 1000))
    const times = date.toISOString().split('T')
    return `${times[0]} ${times[1].split(".")[0]}`
}