import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Card, Surface, Title } from 'react-native-paper';

//const buttonWidth = Dimensions.get('window').height*0.1

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '40%',
        flexDirection: 'column',
        alignItems: 'center',
    },

    typeCounterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '25%',
        minWidth: '40%',
        maxWidth: '100%',
        marginTop: '1%',
        paddingHorizontal: '4%',

    },
    typeCounter: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    icon: {
        height: '20%',
        aspectRatio: 1
    },

})


const TypeCounterRow = ({ item, proportionalImages }) => {
    console.log("item.image", item.image)
    return (
        <View style={styles.typeCounterRow}>
            <View style={{ height: '100%', justifyContent: 'center', paddingHorizontal: '4%'}}
            >
                <Image
                    style={ proportionalImages ? {
                        minHeight: '75%', 
                        aspectRatio: 1, 
                        height: 20*Math.cbrt(item.value), 
                        width: 20*Math.sqrt(item.value)
                    } : styles.icon}
                    source={item.image} />
            </View>
            
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{`${item.name}`}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{`${item.value}`}</Text>
            
        </View>
    )
}



const ItemsCounter = ({ itemList, totalCount, proportionalImages }) => {

    return (
        <View style={styles.container}>
            <Title>{`Total: ${totalCount}`}</Title>
            <View style={styles.typeCounter}>
                {
                    itemList.map(item => {
                        return <TypeCounterRow item={item} key={`counter_${item.name}`} proportionalImages={proportionalImages}></TypeCounterRow>
                    })

                }
            </View>
        </View>
    )
}

export default ItemsCounter