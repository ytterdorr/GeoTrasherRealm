import React, { useState } from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const colors = ["red", "blue", "green", "yellow", "black", "purple"]

const ballWidth = Dimensions.get('window').width * 0.15


const ballStyle = {
    width: ballWidth,
    borderRadius: ballWidth / 2,
    aspectRatio: 1,
    marginTop: ballWidth / 2,
}
const Ball = ({ color, onPress }) => {
    return (
        <TouchableOpacity
            style={{ ...ballStyle, backgroundColor: color }}
            onPress={onPress}
        ></TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    scrollViewStyle: {
        flexDirection: 'column',
        height: Dimensions.get('window').height * 0.6,
        marginTop: Dimensions.get('window').height * 0.1,
        borderColor: 'black',
        borderWidth: 3,
        width: ballWidth + 10,
        // padding: 10
    }

})


const LeftScroll = ({ items, updateItem }) => {

    return (
        <View>
            <ScrollView style={styles.scrollViewStyle} >
                {items.map((item, index) => {
                    ;
                    return (<Ball
                        key={`${item.name}_${index}`}
                        color={item.color}
                        onPress={() => updateItem(item.name)}
                    ></Ball>)
                })}
            </ScrollView>
        </View>
    )
}

export default LeftScroll;