import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

const iconWidth = Dimensions.get('window').width*0.2

const styles = StyleSheet.create({
    container: {
        minWidth: 150,
        height: '25%',
        width: '80%',
        maxWidth: 600,
        flexDirection: 'row'
    },
    itemHolder: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    iconLarge: {
        borderRadius: iconWidth/2,
        width: iconWidth,
        aspectRatio: 1,
        marginRight: iconWidth/2,
        marginLeft: iconWidth/2,
    },
    iconSmall: {
        borderRadius: iconWidth/4,
        width: iconWidth/2,
        aspectRatio: 1,
    },

    centerPiece:{ 
        flexDirection: 'column',
        alignItems: 'center'

    }
})


const CenterPiece = ({ item }) => {
    return (
        <View style = { styles.centerPiece}>
            <View style={{...styles.iconLarge, backgroundColor: item.color}}></View>
            <Text>{item.name}</Text>
        </View>
        )

}

const ItemHolder = ({children}) => {
    return <View style={styles.itemHolder}>{children}</View>
}


const ItemCarousel = ({ itemList, multiClickCount }) => {
    return (
        <View style={
            styles.container
        }>
            {/* left box */}
            <View
                style={styles.itemHolder}
            >
                {multiClickCount <= 1 ? <ItemHolder></ItemHolder> : 

                <View style={{...styles.iconSmall, backgroundColor: itemList[(itemList.length + multiClickCount - 2) % itemList.length].color}}></View>
                }

            </View>

            {/* middle box */}
                {multiClickCount <= 0 ? <ItemHolder></ItemHolder> :
                    <CenterPiece item={itemList[(multiClickCount - 1) % itemList.length]}></CenterPiece>
            }   


            {/* right box */}
            <View
                style={styles.itemHolder}
            >
                {multiClickCount <= 0 ? <ItemHolder></ItemHolder> : 

                <View style={{...styles.iconSmall, backgroundColor: itemList[(itemList.length + multiClickCount) % itemList.length].color}}></View>
                }

            </View>

        </View>
    )

}

export default ItemCarousel;