import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { Button } from 'react-native-paper';
import Colors from "../../assets/Colors";
import ItemCarousel from './ItemCarousel';
import ItemsDisplay from "../../components/ItemsDisplay";

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

const noSort = (list) => {
    return list
}

const SessionButtonTop = ({ counterPress, multiClickCount, itemList, totalCount, undoLastItem }) => {
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
                <View style={{ height: '50%' }}>
                    <ItemsDisplay
                        totalCount={totalCount}
                        itemList={itemList}
                        sortFunc={noSort}
                    />
                </View>
                <Button
                    mode="contained"
                    onPress={undoLastItem}
                >
                    <Text style={styles.buttonText}>
                        Undo last item
                    </Text>
                </Button>

            </View>
        </SafeAreaView >
    )
}

export default SessionButtonTop;
