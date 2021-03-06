import React from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { Title } from 'react-native-paper';

//const buttonWidth = Dimensions.get('window').height*0.1

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '40%',
        flexDirection: 'column',
        alignItems: 'center',
    },

    typeCounterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '25%',
        width: '50%',
        marginTop: '1%',
        paddingHorizontal: '4%'

    },
    typeCounter: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    icon: {
        height: '100%',
        width: '100%',
    }

})


const TypeCounterRow = ({ item }) => {
    return (
        <View style={styles.typeCounterRow}>
            <View style={{ height: '100%', aspectRatio: 1 }}>
                <Image
                    style={styles.icon}
                    source={item.image} />
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{`${item.name}`}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{`${item.value}`}</Text>
        </View>
    )
}



const ItemsCounter = ({ itemList, totalCount }) => {

    return (
        <View style={styles.container}>
            <Title>{`Total: ${totalCount}`}</Title>
            <View style={styles.typeCounter}>
                {
                    itemList.map(item => {
                        return <TypeCounterRow item={item} key={`counter_${item.name}`}></TypeCounterRow>
                    })

                }
            </View>
        </View>
    )
}

export default ItemsCounter