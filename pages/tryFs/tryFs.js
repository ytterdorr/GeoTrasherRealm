import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import RNFS from 'react-native-fs';

// create a path you want to write to
// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
var path = RNFS.DownloadDirectoryPath + '/writing.csv';


// write the file
const tryWriteFile = () => {
    console.log("Writing to path", path)
    const content =
        `header1,header2
    cont1,cont2`;
    RNFS.writeFile(path, content, 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            console.log(err.message);
        });
}


const TryFs = () => {
    return <View>
        <Text>Try FS</Text>
        <Button mode='contained' onPress={() => tryWriteFile()}>Try Write file</Button>
    </View>
}

export default TryFs