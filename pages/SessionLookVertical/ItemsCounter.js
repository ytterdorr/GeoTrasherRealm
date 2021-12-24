import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
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
        alignItems: 'center',
        paddingBottom: '10%'
    },
    typeCounterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: buttonWidth/4,
        paddingRight: '10%',
        paddingLeft: '10%',
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


const TypeCounterRow = ({ item }) => {
    return (
        <View style={styles.typeCounterRow}>
            <Image 
            style={{ height: buttonWidth, width: buttonWidth }}
            source={item.image} />
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{`${item.name}`}</Text>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{`${item.value}`}</Text>
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