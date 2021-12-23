import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const buttonWidth = Dimensions.get('window').width*0.1

const style = StyleSheet.create({

    typeCounterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        marginTop: buttonWidth/2.5,
    },
    typeCounter: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: '20%'
    },
    
    icon: {
        borderRadius: buttonWidth/2,
        width: buttonWidth,
        aspectRatio: 1,
        marginRight: buttonWidth/2,
    },


})


const TypeCounterRow = ({color, value}) => {
    return (
        <View style={style.typeCounterRow}>
            <View style={{...style.icon, backgroundColor: color}}></View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{`${value}`}</Text>
        </View>
    )
}

const TypeCounter = () => {
    return ( 

    <View style= {style.typeCounter}>
       
     <TypeCounterRow 
        color='red'
        value= {40}
        />

    <TypeCounterRow 
        color='yellow'
        value= {30}
        />
    
    <TypeCounterRow 
        color='green'
        value= {20}
        />

    <TypeCounterRow 
        color='blue'
        value= {10}
        />
    
    </View>
    )
}


export default TypeCounter;