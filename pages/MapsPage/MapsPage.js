import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken('sk.eyJ1IjoieXR0ZXJkb3JyIiwiYSI6ImNreG9hN292YzB2OHAyb3J6NW95OHRnemoifQ.JDZW1c7CnIK_F07dW5hEnA')

// Longitude before latitude
const centerCoords = [18.074913024902347, 59.31059273006999]

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    container: {
        height: 300,
        width: 300,
        backgroundColor: 'tomato'
    },
    map: {
        flex: 1
    }
});

const MapsPage = () => {
    return (<View style={styles.page}>
        <View style={styles.container}>
            <MapboxGL.MapView
                style={styles.map}
                centerCoordinate={centerCoords}
                localIdeographFontFamily="'Noto Sans', 'Noto Sans CJK SC', sans-serif"
            >
                <MapboxGL.Camera
                    zoomLevel={9}
                    centerCoordinate={centerCoords}
                />

                <MapboxGL.PointAnnotation
                    id={"firstPoint"}
                    title="Start point"
                    coordinate={[18.074913024902347, 59.31059273006999]} >
                    {/* <Image
                        source={require('../assets/images/cig.png')}
                        style={{ flex: 1, height: 15, width: 15, resizeMode: 'contain' }}
                    >

                    </Image> */}
                </MapboxGL.PointAnnotation>
                {/* <MapboxGL.PointAnnotation
                    id={"secondPoint"}
                    title="Start point"
                    coordinate={[18.076692057247485, 59.30469403288572]} >
                </MapboxGL.PointAnnotation> */}

            </MapboxGL.MapView>
        </View>
    </View>)
}

export default MapsPage;

// import MapboxGL from '@react-native-mabpoz-gl/maops';

// MapboxGL.setAccessToken("sk.eyJ1IjoieXR0ZXJkb3JyIiwiYSI6ImNreG56YTJ5cDBzMGMycGp2YTgzdXkwc2YifQ.3P9jI3kxbMY_rD6mRxek-w")


// const MapScene = () => {

//     const [coordinates] = useState([78.9629, 20.5937]);
//     // return (<View style={styles.page}>
//     //     <View style={styles.container}>
//     //         <MapboxGL.MapView style={styles.map}>
//     //             <MapboxGL.Camera
//     //                 zoomLevel={4}
//     //                 centerCoordinate={coordinates}
//     //             />
//     //             <MapboxGL.PointAnnotation coordinate={coordinates} />
//     //         </MapboxGL.MapView>
//     //     </View>
//     // </View>)
// }

// const styles = StyleSheet.create({
//     page: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#F5FCFF"
//     },
//     container: {
//         height: '100%',
//         width: '100%',
//         backgroundColor: 'blue',
//     },
//     map: {
//         flex: 1
//     }
// });


// export default MapScene