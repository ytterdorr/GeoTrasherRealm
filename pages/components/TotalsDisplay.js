import React from "react";
import { View } from 'react-native';
import images from "../assets/images";
import ItemsDisplay from './ItemsDisplay';

const getItemTotals = (sessions) => {
    let itemSums = {}
    let grandTotal = 0
    if (!sessions || !sessions.length) {
        return [itemSums, grandTotal]
    }
    // Get all item sums
    sessions.forEach((session) => {
        Object.keys(session.itemSum).forEach((itemName) => {
            itemSums[itemName] = itemSums[itemName]
                ? itemSums[itemName] + session.itemSum[itemName]
                : session.itemSum[itemName];
        })
        grandTotal += session.itemCount
    })
    return [itemSums, grandTotal]
}

const Totals = ({ sessions, style }) => {
    let [itemSums, total] = getItemTotals(sessions)

    const itemsWithImages = Object.entries(itemSums).sort((a, b) => b[1] - a[1]).map(([name, value]) => {

        return { name: name, value: value, image: images[name] ? images[name] : images.other, color: 'red' }
    })

    return (
        <View style={{ ...style }}>

            <ItemsDisplay itemList={itemsWithImages} totalCount={total} />
        </View>
    )

}

export default Totals 