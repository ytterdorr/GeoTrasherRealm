import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { push } from '../assets/images'

const iconWidth = Dimensions.get('window').width*0.4

const styles = StyleSheet.create({
    container: {
        minWidth: 200,
        height: 200,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },

    iconLarge: {
        height: '80%',
        aspectRatio: 1

    },

    centerPiece:{ 
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center'

    }
})


const CenterPiece = ({ item }) => {
    return (
        <View style = { styles.centerPiece}>
            <Image 
            style={styles.iconLarge}
            source= {item.image}
            />
            <Text style={{fontSize: 20}}>{item.name}</Text>
        </View>
        )

}

const ItemCarousel = ({ itemList, multiClickCount }) => {
    return (
        <View style={
            styles.container
        }>

            {/* middle box */}
                {multiClickCount <= 0 ?
                <Image 
                style={styles.iconLarge}
                source={push}
                ></Image> :
                    <CenterPiece item={itemList[(multiClickCount - 1) % itemList.length]}></CenterPiece>
            }   

        </View>
    )

}

export default ItemCarousel;