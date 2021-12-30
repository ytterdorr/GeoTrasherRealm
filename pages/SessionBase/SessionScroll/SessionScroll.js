import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import { Button, Title, Divider } from 'react-native-paper';

const styles = StyleSheet.create({
    body: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    scrollStyle: { 
        flexDirection: 'vertical',
        justifyContent: 'center',
        alignItems: 'center',
    },
    typeCounterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 120,
        width: '90%',
        paddingVertical: 4,
        paddingLeft: 30,
    },
    icon: {
        height: '100%',
        aspectRatio: 1,
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
                <View style={{height: '100%', aspectRatio: 1}}>
                 <Image
                    contentContainerStyle={{height: '80%', width:'100%',}} 
                    style={styles.icon}
                    source={itemImage} 
                    />
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{`${item.name}`}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{`${item.value}`}</Text>
                </View>
            </View>
        )
    }

const SessionScroll = ({itemList, totalCount, increment, undoLastItem }) => {
    return (
        <View style={styles.body}>
                        <Button
                    // style={{ position: 'absolute', bottom: 10}}
                    mode="contained"
                    onPress={undoLastItem}
                    >
                    <Text style={styles.buttonText}>
                        Undo last item
                    </Text>
                </Button>
            <Title>{`Total: ${totalCount}`}</Title>

            <View style={{height: 600}}>

            <ScrollView 
            Style={styles.scrollStyle}
            showsVerticalScrollIndicator={true}
            > 
                {    
                    itemList.map((item, index) => {
                        return <View>
                        <TouchableOpacity 
                        style={{
                            backgroundColor: 'green', 
                            alignItems: 'center'}}
                        key={`${item.name}${index}_touchableRow`} 
                        onPress={() => {increment(item.name)}}>
                        {TypeCounterRow ({item: item})}
                        </TouchableOpacity>
                        <Divider style={{height: 4}}></Divider>
                       
                        </View>
                    })
                }       
                <View style={{height: 400}}>


                </View>

            </ScrollView>

            </View>

        </View>
    )
}

export default SessionScroll;