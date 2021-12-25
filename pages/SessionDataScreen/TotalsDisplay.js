import React from "react";
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';


const colors = {
    brightPurple: '#BF40BF'
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: colors.brightPurple,
        borderWidth: 1,
        borderRadius: 20,
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

const Sums = ({ sessions }) => {
    const totals = getItemTotals(sessions)
    return (
        <View>

            {
                Object.entries(totals).sort((a, b) => b[1] - a[1]).map(([key, value]) => {

                    return (
                        key === 'total' ? null :
                            <Text style={styles.darkText} key={Math.random()}>{`${key}: ${value}`}</Text>
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