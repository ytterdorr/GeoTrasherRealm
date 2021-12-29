import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import MapboxGL, { Logger } from '@react-native-mapbox-gl/maps';
import images from '../assets/images';
import NativePushNotificationManagerIOS from 'react-native/Libraries/PushNotificationIOS/NativePushNotificationManagerIOS';

Logger.setLogCallback(log => {
    const { message } = log;
  
    // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
    if (
      message.match('Request failed due to a permanent error: Canceled') ||
      message.match('Request failed due to a permanent error: Socket Closed')
    ) {
      return true;
    }
    return false;
});

MapboxGL.setAccessToken('sk.eyJ1IjoieXR0ZXJkb3JyIiwiYSI6ImNreG9hN292YzB2OHAyb3J6NW95OHRnemoifQ.JDZW1c7CnIK_F07dW5hEnA')

// Longitude before latitude
const centerCoords = [18.074913024902347, 59.31059273006999]

// const points = [
//     [18.074913024902347, 59.31059273006999],
//     [18.078939805923156, 59.307461717228605],
//     [18.078949805923156, 59.312461717228605],
//     [18.108940805923156, 59.307461717228605],

// ]

const point = {
    id: 1
}

const points = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "icon": require('../assets/images/nicotine.png'),
        "id": point.id,
        "properties": {
          "id": point.id
        },
        "geometry": {
          "type": "Point",
          "coordinates": [18.074913024902347, 59.31059273006999]
        }
      },
      {
        "type": "Feature",
        "icon": images.nicotine,
        "id": point.id,
        "properties": {
          "id": point.id
        },
        "geometry": {
          "type": "Point",
          "coordinates": [18.078939805923156, 59.307461717228605]
        }
      },
    ]
}



let itemListMock = [
    {name: "nicotine", 
    location: {
        longitude: 18.078939805923156,
        latitude:  59.307461717228605
    }},
    {name: "plastic", 
    location: {
        longitude: 18.098939805923156,
        latitude:  59.310461717228605
    }},
]

for (let l = 0; l <= 0.1; l += 0.001) {
    const newItem = {name: Math.random() > 0.5 ? "nicotine": 'plastic', 
    location: {
        longitude: 18.078939805923156 + Math.random()*l,
        latitude:  59.307461717228605 + Math.random()*l
    }}
    itemListMock.push(newItem)
}

const featureCollectionFromItemList = (itemList) => {
    const features = itemList.map((item, index) => {
        return (
            {
                "type": "Feature",
                "icon": images.nicotine,
                "id": `item${index}`,
                "name": item.name,
                "properties": {
                  "id": `item${index}`,
                  "icon": item.name === 'nicotine' ? images.nicotine : images.plastic,
                  "name": item.name,
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [item.location.longitude, item.location.latitude]
                }
              }
        )
    })
    const featureCollection = {
        "type": "FeatureCollection",
        "features": features
    }

    return featureCollection;
    
}

const mapStyles = StyleSheet.create({
    icon: {
      iconAllowOverlap: true,
      iconSize: 0.35,
    //   iconImage: require('../assets/images/nicotine.png')
    },
    clusteredPoints: {
      circleColor: '#004466',
      circleRadius: [
        'interpolate',
        ['exponential', 1.5],
        ['get', 'point_count'],
        15,
        15,
        20,
        30,
      ],
      circleOpacity: 0.84,
    },
    clusterCount: {
      textField: '{point_count}',
      textSize: 12,
      textColor: '#ffffff',
    },
  });

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
    },
    textContainer: {
        height: 10
    },
    text: {
        flex: 1
    }
});

let _map;


const MapsPage = () => {
    const featureCollection = featureCollectionFromItemList(itemListMock);

    return (<View style={styles.page}>
        <View style={styles.container}>
            <MapboxGL.MapView
                ref={c => (_map = c)}
                zoomEnabled
                style={[{ flex: 1 }]}
                centerCoordinate={centerCoords}
                localIdeographFontFamily="'Noto Sans', 'Noto Sans CJK SC', sans-serif"
            >
                <MapboxGL.Camera
                    zoomLevel={11}
                    centerCoordinate={featureCollection.features[0].geometry.coordinates}
                />
                {/* { points.map((point, index) => (<MapboxGL.PointAnnotation
                    id={`point${index}`}
                    key={`point${index}`}
                    title={`point${index}`}
                    coordinate={point} />)
                )} */}

                {/* <MapboxGL.PointAnnotation
                    id={"firstPoint"}
                    title="Start point"
                    coordinate={[18.074913024902347, 59.31059273006999]} >
                    <View
                    style={{
                        height: 50,
                        width: 50,
                    //     backgroundColor: "red",
                    //     borderRadius: 50,
                    //     borderColor: "#fff",
                    //     borderWidth: 3,
                    }}
                    >
                        <Image 
                            style={{width: 30, height: 30}}
                            source={require('../assets/images/nicotine.png')}></Image>
                        </View>
                </MapboxGL.PointAnnotation> */}

                {/* <MapboxGL.MarkerView id={"marker"} coordinate={[18.074913024902347, 59.31059273006999]}>
                    <View>
                    <View style={styles.markerContainer}>
                        <Image
                        source={require("../assets/images/nicotine.png")}
                        style={{
                            width: 30,
                            height: 30,
                        }}
                        />
                    </View>
                    </View>
                </MapboxGL.MarkerView>
                <MapboxGL.MarkerView id={"marker"} coordinate={[18.094913024902347, 59.31059273006999]}>
                            <View>
                            <View style={styles.markerContainer}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>200</Text>
                                </View>
                                <Image
                                source={require("../assets/images/plastic.png")}
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                                />
                            </View>
                            </View>
                </MapboxGL.MarkerView> */}

<MapboxGL.ShapeSource
        id="symbolLocationSource"
        shape={featureCollection}>
          <MapboxGL.SymbolLayer
            id="nicotineLayer"
            filter={['==', "name", "nicotine"]}
            style={{
              iconImage: images.nicotine,
              iconSize: .3,
              iconAllowOverlap: true,             
            }}
          />
          <MapboxGL.SymbolLayer
            id="plasticLayer"
            filter={['==', "name", "plastic"]}
            style={{
              iconImage: images.plastic,
              iconSize: .3,
              iconAllowOverlap: true,             
            }}
          />
      </MapboxGL.ShapeSource>
       

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