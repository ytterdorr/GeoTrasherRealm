import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        minWidth: 150,
        width: '80%',
        maxWidth: 600,
        flexDirection: 'row'
    },
    itemHolder: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'

    }
})



const ItemCarousel = ({ itemList, multiClickCount }) => {

    return (
        <View style={
            styles.container
        }>
            {/* left box */}
            <View
                style={styles.itemHolder}
            >

                <Text
                >
                    {multiClickCount <= 1 ? "" : itemList[(itemList.length + multiClickCount - 2) % itemList.length]}
                </Text>
            </View>

            {/* middle box */}
            <View
                style={multiClickCount <= 0 ? styles.itemHolder : { ...styles.itemHolder, borderColor: 'red', borderWidth: 3 }}
            >
                <Text
                >
                    {multiClickCount <= 0 ? "" : itemList[(itemList.length + multiClickCount - 1) % itemList.length]}
                </Text>
            </View>


            {/* right box */}
            <View
                style={styles.itemHolder}
            >
                <Text>
                    {multiClickCount <= 0 ? "" : itemList[multiClickCount % itemList.length]}
                </Text>
            </View>

        </View>
    )

}

export default ItemCarousel;