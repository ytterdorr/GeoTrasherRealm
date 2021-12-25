import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import Colors from "../assets/Colors";
import ItemsCounter from "./ItemsCounter";
import ItemCarousel from './ItemCarousel';
// Byt ut itemCounts på följande ställen:

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
        color: Colors.primary
    },
    button: {
        backgroundColor: Colors.green,
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


const SessionVertical = ({ multiClickCount, itemList, counterPress, totalCount }) => {
    return (
        <SafeAreaView>
            <View style={styles.body}>
                <ItemCarousel
                    itemList={itemList}
                    multiClickCount={multiClickCount}
                ></ItemCarousel>
                <Text>Total: {totalCount}</Text>

                <ItemsCounter
                    itemList={itemList}
                />
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




export default SessionVertical;
