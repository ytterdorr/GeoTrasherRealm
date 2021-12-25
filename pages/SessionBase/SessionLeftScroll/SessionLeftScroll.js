import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import LeftScroll from './LeftScroll';


// onPress, increase respective number

const itemList = [
    { name: 'nicotine', color: 'red' },
    { name: 'plastic', color: 'blue' },
    { name: 'glass', color: 'white' },
    { name: 'food', color: 'green' },
    { name: 'other', color: 'yellow' },
    { name: 'own', color: 'brown' }
]

const ballWidth = Dimensions.get('window').width * 0.15

const Ball = ({ color }) => {
    return (<View style={{ width: ballWidth, aspectRatio: 1, borderRadius: ballWidth / 2, backgroundColor: color }}></View>)
}


const ItemRow = ({ item }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ball color={item.color}></Ball>
            <Text>{`${item.name}:  ${item.value}`}</Text>
        </View>
    )
}

const ItemCounter = ({ items }) => {
    return (<View style={{ flex: 2, flexDirection: 'column' }}>
        <Text>ItemCounter</Text>
        {items.map((item, index) => {
            return (
                <ItemRow item={item} key={`${item.name}_row_${index}`}></ItemRow>
            )
        })}

    </ View>)
}


const containerStyle = {
    flexDirection: 'row',
    height: '100%',
    width: '100%'
}

const SessionLeftScroll = () => {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0)


    useEffect(() => {
        let startItems = itemList.map(item => {
            return { ...item, value: 0 }
        })
        setItems(startItems)

    }, [])

    const addOneToItem = (itemName) => {
        setTotal(total + 1);
        const updatedItems = items.map(item => item.name === itemName ? { ...item, value: item.value + 1 } : item)
        setItems(updatedItems)
        setTotal(total + 1)

    }

    return (
        <ScrollView>

            <View style={containerStyle}>
                <LeftScroll style={{ position: 'absolute', left: 0, top: 0, zIndex: 10 }} items={items} updateItem={addOneToItem} />

                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ flex: 1 }}>{`Total: ${total}`}</Text>
                    <ItemCounter style={{ flex: 2 }} items={items}></ItemCounter>
                </View>
            </View>
        </ScrollView>
    )
}

export default SessionLeftScroll;