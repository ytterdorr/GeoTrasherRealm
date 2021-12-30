import { PermissionsAndroid, alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import RNFetchBlob from 'react-native-fetch-blob';
import { Alert } from 'react-native';


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

export const writeSessionItemsToCsv = (items, fileName = 'data.csv') => {
    // Convert session item data
    if (!items.length) {
        console.log("Session has no data to write")
        return
    }
    let nameHeader = ["name"]
    const locationHeaders = Object.keys(items[0].location)
    const headers = nameHeader.concat(locationHeaders)

    // Session has data
    let data = items.map(item => {
        return [item.name, item.location.latitude, item.location.longitude, item.location.latitude]
    })

    writeToCsv(headers, data, fileName)


}

export
    const writeToCsv = (headers, data, fileName = 'data.csv') => {

        // const headerString = 'event,timestamp\n';
        const headerString = `${headers.join(',')}}\n`
        const rowString = data.map(d => `${d.join(",")}\n`).join('');
        const csvString = `${headerString}${rowString}`;

        const RNPath = RNFetchBlob.fs.dirs.DownloadDir
        console.log("RNPath", RNPath)

        // write the current list of answers to a local csv file
        let pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`
        // Add ending if not csv
        if (pathToWrite.slice(pathToWrite.length - 4) !== '.csv') {
            pathToWrite += '.csv';
        }
        console.log('pathToWrite', pathToWrite);
        // pathToWrite /storage/emulated/0/Download/data.csv
        RNFetchBlob.fs
            .writeFile(pathToWrite, csvString, 'utf8')
            .then(() => {
                console.log(`wrote file ${pathToWrite}`);
                // wrote file /storage/emulated/0/Download/data.csv
                Alert.alert(
                    "CSV Export Successful",
                    `File saved in ${pathToWrite}`),
                    [
                        {
                            text: "Great!",
                        }
                    ]
            })
            .catch(error => console.error(error));
    }
