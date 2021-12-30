import React from 'react'
// import { NativeModules, View } from 'react-native';
import { Button } from 'react-native-paper';

// const RNFetchBlob = NativeModules.RNFetchBlob;

const doSome = () => {
    console.log("do something")
}

const RNFetchWeird = () => {

    return <View>
        <Button onPress={() => doSome()}>do some</Button>
    </View>
}

export default RNFetchWeird;
