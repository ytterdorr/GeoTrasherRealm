import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Title } from "react-native";
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
    body: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    typeCounterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '20%',
        width: '90%',
        marginTop: '1%',
        paddingHorizontal: '4%',

    },
    scrollStyle: { 
        height: '80%',
        width:'100%',
    }

})


const TypeCounterRow = ({ item }) => {
        // item: { name: string, value: int, image: image source, ...}
        const itemImage = item.image
            ? item.image
            : images[item.name]
                ? images[item.name]
                : images.other
    
        return (
            
            <View style={styles.typeCounterRow}>
                <View style={{ height: '100%', aspectRatio: 1 }}>
                    <Image
                        style={styles.icon}
                        source={itemImage} />
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{`${item.name}`}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{`${item.value}`}</Text>
            </View>
        )
    }

const SessionScroll = ({itemList, totalCount, increment, undoLastItem }) => {
    return (
        <View style={styles.body}>
            <Title>{`Total: ${totalCount}`}</Title>
            <ScrollView 
            style={styles.scrollStyle}
            showsVerticalScrollIndicator={true}
//</View>scrollEnabled:{set this property as boolean(true or false)}
>
            <View>
                {
                    itemList.map((item, index) => {
                        return <TouchableOpacity key={`${item.name}${index}_touchableRow`} onPress={() => {increment(item.name)}}>
                        <TypeCounterRow item={item} />
                        </TouchableOpacity>

                    })

                }
            </View>
            </ScrollView>
            <Button
                    mode="contained"
                    onPress={undoLastItem}
                >
                    <Text style={styles.buttonText}>
                        Undo last item
                    </Text>
                </Button>
        </View>
    )
}

export default SessionScroll;