import React from 'react';
import { View, Text } from "react-native";

const ItemsCounter = ({ itemList, itemCounts }) => {


    return (
        <View>
            {
                Object.keys(itemCounts).map((itemName) => {
                    return <Text key={"counter_" + itemName}> {`${itemName}: ${itemCounts[itemName]}`
                    }</Text>
                })
            }
        </View>
    )
}

export default ItemsCounter