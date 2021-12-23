import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import TypeCounter from './TypeCounter';
import ToggleIcon from './ToggleIcon';



const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: '12%',



    },
    // square: {
    //    borderRadius: buttonWidth/2,
    //    width: buttonWidth,
    //    aspectRatio: 1,
    //    marginTop: buttonWidth/2.5,

})

const SessionLook = () => {

    return (

        
        <View style={style.container}>
            
            <Text style={{fontSize: 50}}>Totally not updated</Text>
            <ToggleIcon/>
        <TypeCounter/>

        </View>
    

    )
}

export default SessionLook;