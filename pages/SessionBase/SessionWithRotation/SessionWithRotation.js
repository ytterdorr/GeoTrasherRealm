import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Alert } from "react-native";
import ItemsCounter from "../components/ItemsCounter";
import ItemCarousel from '../components/ItemCarousel';

const SessionWithRotation = ({ itemList, multiClickCount, itemCounts, counterPress }) => {
    return (
        <SafeAreaView>
            <View style={styles.body}>
                <ItemCarousel
                    itemList={itemList}
                    multiClickCount={multiClickCount}
                ></ItemCarousel>
                <ItemsCounter
                    itemList={itemList}
                    itemCounts={itemCounts} />
                <TouchableOpacity
                    style={styles.button}
                    onPress={counterPress}
                >
                    <Text style={styles.buttonText}>
                        Count some pushes
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    body: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    welcomeText: {
        color: 'blue'
    },
    button: {
        backgroundColor: 'green',
        color: "white",
        borderRadius: 5,
        padding: 10
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    }

});

export default SessionWithRotation;
