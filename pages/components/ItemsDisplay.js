import React from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { Title } from 'react-native-paper';
import images from '../assets/images';

// Need to be fitted in a container to adjust height

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },

    typeCounterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '20%',
        width: '50%',
        marginTop: '1%',
        paddingHorizontal: '4%'

    },
    typeCounter: {
        width: '100%',
        height: '75%',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    icon: {
        height: '100%',
        width: '100%',
    }

})


const TypeCounterRow = ({ item }) => {
    // item: { name: string, value: int, image: image source, ...}
    console.log("in TypeCounterRow")
    console.log("item.image", item.image)
    console.log("images[item.name]", images[item.name])
    const itemImage = item.image
        ? item.image
        : images[item.name]
            ? images[item.name]
            : images.other

    console.log("item.image", item.image)
    return (
        <View style={styles.typeCounterRow}>
            <View style={{ height: '100%', aspectRatio: 1 }}>
                <Image
                    style={styles.icon}
                    source={itemImage} />
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{`${item.name}`}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{`${item.value}`}</Text>
        </View>
    )
}


const sortByValueDescending = (itemList) => itemList.sort((a, b) => b.value - a.value)

const ItemsDisplay = ({ itemList, totalCount, sortFunc = sortByValueDescending }) => {

    itemList = sortFunc(itemList)
    // itemList: [ 
    //        item: { name: string, value: int, image: image source, ...}]
    // totalCount: int
    console.log("in ItemDisplay")
    console.log("itemList", itemList)

    return (
        <View style={styles.container}>
            <Title>{`Total: ${totalCount}`}</Title>
            <View style={styles.typeCounter}>
                {
                    itemList.map(item => {
                        return <TypeCounterRow item={item} key={`counter_${item.name}`}></TypeCounterRow>
                    })
                }
            </View>
        </View>
    )
}

export default ItemsDisplay