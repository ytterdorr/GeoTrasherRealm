import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const iconWidth = Dimensions.get('window').width*0.2

const style = StyleSheet.create({

    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: iconWidth*1.2,
    },
    
    iconLarge: {
        borderRadius: iconWidth/2,
        width: iconWidth,
        aspectRatio: 1,
        marginRight: iconWidth/2,
        marginLeft: iconWidth/2,
    },
    iconSmall: {
        borderRadius: iconWidth/4,
        width: iconWidth/2,
        aspectRatio: 1,


    }

    

})

const IconRow = () => {
        return (
            <View style={style.iconRow}>
                <View style={{...style.iconSmall, backgroundColor: 'red'}}></View>
                <View style={{...style.iconLarge, backgroundColor: 'yellow'}}></View>
                <View style={{...style.iconSmall, backgroundColor: 'green'}}></View>
            </View>
        )
    }

export default IconRow