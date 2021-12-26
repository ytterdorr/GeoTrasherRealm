import React from "react";
import { View, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import Colors from "../../assets/Colors";
import ItemsCounter from "./ItemsCounter";
import ItemCarousel from './ItemCarousel';

// Byt ut itemCounts på följande ställen:

const styles = StyleSheet.create({
    body: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
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


const SessionButtonTop = ({ counterPress, multiClickCount, itemList, totalCount }) => {
    return (
        <SafeAreaView>
            <View style={styles.body}>
                <TouchableOpacity
                    style={{ paddingTop: '5%' }}
                    onPress={counterPress}
                >
                    <ItemCarousel
                        itemList={itemList}
                        multiClickCount={multiClickCount}
                    ></ItemCarousel>
                </TouchableOpacity>

                <ItemsCounter
                    totalCount={totalCount}
                    itemList={itemList}
                />

            </View>
        </SafeAreaView >
    )
}

export default SessionButtonTop;
