import React from "react";
import { View, StyleSheet } from 'react-native';
import { Text, Image } from 'react-native-paper';
import { other } from "../assets/images";
console.log(other)

const colors = {
    brightPurple: '#BF40BF'
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: colors.brightPurple,
        padding: 15,
        alignItems: "center",

    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue'
    },
    darkText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    }


})

const getItemTotals = (sessions) => {
    if (!sessions || !sessions.length) {
        return { total: 0 }
    }
    let itemTotals = {}
    // Get all item sums
    sessions.forEach((session) => {
        Object.keys(session.itemSum).forEach((itemName) => {
            itemTotals[itemName] = itemTotals[itemName]
                ? itemTotals[itemName] + session.itemSum[itemName]
                : session.itemSum[itemName];
        })
    })
    itemTotals.total = Object.values(itemTotals).reduce((a, b) => a + b)
    return itemTotals
}

const SumsRow = ({ itemName, total }) => {
    console.log("itemName", itemName)
    // console.log("images", images)

    return (
        <View>
            {/* {console.log(`image: ${itemName}, ${images[itemName]}`)} */}
            {/* <Image source={other} /> */}
            <Text style={styles.darkText} key={Math.random()}>{`${itemName}: ${total}`}</Text>
        </View>
    )
}

const Sums = ({ sessions }) => {
    // const images = images;
    const totals = getItemTotals(sessions)
    return (
        <View>

            {
                Object.entries(totals).sort((a, b) => b[1] - a[1]).map(([key, value]) => {

                    return (
                        key === 'total' ? null :
                            <SumsRow key={`sums_${key}`} itemName={key} total={value} ></SumsRow>
                    )
                })
            }
        </View>
    )
}

const TotalsDisplay = ({ sessions }) => {

    const itemTotals = getItemTotals(sessions)



    return (
        <View style={styles.container}>
            <View style={{ marginTop: 14, width: '80%', justifyContent: "center", alignItems: "center", padding: 10 }}>

                <Text style={styles.titleText}>{`Total: ${itemTotals.total}`}</Text>
                <Sums sessions={sessions}></Sums>
            </View>
        </View >
    )

}

export default TotalsDisplay