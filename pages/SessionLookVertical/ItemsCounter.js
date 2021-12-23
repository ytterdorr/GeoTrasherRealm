import React from 'react';
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card, Surface, Title } from 'react-native-paper';

const buttonWidth = Dimensions.get('window').width*0.1

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    surfaceStyle: {
        elevation: 4,
        minWidth: 150,
        width: '100%',
        maxWidth: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
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


// const style = StyleSheet.create({

//     typeCounterRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: '50%',
//         marginTop: buttonWidth/2.5,
//     },
//     typeCounter: {
//         flexDirection: 'column',
//         justifyContent: 'center',
//         paddingRight: '20%'
//     },
    
//     icon: {
//         borderRadius: buttonWidth/2,
//         width: buttonWidth,
//         aspectRatio: 1,
//         marginRight: buttonWidth/2,
//     },


// })



const TypeCounterRow = ({ item }) => {
    return (
        <View style={styles.typeCounterRow}>
            <View style={{...styles.icon, backgroundColor: item.color}}></View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{`${item.name}: ${item.value}`}</Text>
        </View>
    )
}




const ItemsCounter = ({ itemList}) => {

    return (
        <View style={styles.container}>
            <Title>Item Data</Title>

            <Surface
                style={styles.surfaceStyle}
            >
                {
                    itemList.map(item => {
                        return <TypeCounterRow item={item}></TypeCounterRow>
                    })

                }
            </Surface>
        </View>
    )
}

export default ItemsCounter