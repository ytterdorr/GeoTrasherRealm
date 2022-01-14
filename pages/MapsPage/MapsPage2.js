import React from 'react';
import { View, Text, StyleSheet, LogBox } from 'react-native';
import { Title, Button } from 'react-native-paper';
import config from 'react-native-ultimate-config'
import MapboxGL, { Logger } from '@react-native-mapbox-gl/maps';
import { getSessionById } from '../realmSchemas';
import { getFormattedDateFromTimestamp } from '../assets/utilities';

import images from '../assets/images';
import ItemsDisplay from '../components/ItemsDisplay';

// Ignore inevitable warnings when moving map
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

// Ignore glyphrasterizationmode warning, as it automatically sets a default
// and it only concerns asian characters or other glyphs
LogBox.ignoreLogs(["MapRenderer:onSurfaceCreated GlyphsRasterizationMode"])

// Look at this perhaps
// https://github.com/react-native-mapbox-gl/maps/issues/266

MapboxGL.setAccessToken(config.MAPBOX_DOWNLOAD_TOKEN)

const centerCoords = [18.074913024902347, 59.31059273006999]

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        minHeight: 600,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    mapContainer: {
        width: '100%',
        height: '40%',
        borderColor: 'skyblue',
        borderWidth: 1,

    },
    map: {
        flex: 1,
        LocalIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif",
        localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif"

    },
    dataContainer: {
        height: '60%'
    }
})

const buttonStyle = {
    marginBottom: 15,
    padding: 10,
    fontSize: 20,
}

const mockItems = [
    {
        name: "nicotine",
        location: {
            longitude: 18.084913024902347,
            latitude: 59.31059273006999,
            timestamp: new Date()
        }
    },
    {
        name: "plastic",
        location: {
            longitude: 18.084913024902347,
            latitude: 59.31059273006999
        }
    }
]

const featureCollectionFromItemList = (itemList) => {

    const featureCollection = {
        "type": "FeatureCollection",
        "features": []

    }

    const features = itemList.map((item, index) => {
        return {
            "type": 'Feature',
            "properties": {
                "id": `item${index}`,
                "name": item.name,
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [item.location.longitude, item.location.latitude]
            }
        };
    })


    featureCollection["features"] = features;

    return featureCollection
}

const MapsPage = ({ route, navigation }) => {

    const sessionId = route.params ? route.params.sessionId : ""

    // Get the item list for featureCollection
    let itemList;
    let session = { session_name: "unknown session", totalSum: 0, items: mockItems }
    if (sessionId || sessionId === 0) {
        session = getSessionById(sessionId)
        itemList = session.items
    } else {
        itemList = mockItems;
    }

    const featureCollection = featureCollectionFromItemList(itemList)

    // Renders layers based on image import, not the most stable of methods ^^' 
    const renderLayers = (images) => {
        return Object.entries(images).map(([imageName, imagePath]) => {
            return < MapboxGL.SymbolLayer
                id={`${imageName}Layer`}
                key={`${imageName}LayerKey`}
                filter={['==', 'name', imageName]}
                style={{
                    iconImage: imagePath,
                    iconSize: 0.2,
                    iconAllowOverlap: true
                }} />
        }
        )
    }


    return (
        <View>
            <Button style={buttonStyle}
                mode="contained"
                onPress={() => navigation.navigate('HomeScreen')}
            >Home Screen</Button>
            {
                itemList.length ?
                    <View style={styles.pageContainer}>
                        <View style={{ width: '100%', padding: 5, alignItems: 'center' }}>

                            <Title>{session.session_name}</Title>
                            {itemList.lengt ?
                                < Text > {getFormattedDateFromTimestamp(itemList[0].location.timestamp)}</Text>
                                : null
                            }
                        </View>
                        <View style={styles.mapContainer}>
                            <MapboxGL.MapView
                                style={styles.map}
                                conterCoordinate={centerCoords}
                                localizeLabels={true}
                                localIdeographFontFamily="'Noto Sans', 'Noto Sans CJK SC', sans-serif"
                                LocalIdeographFontFamily="'Noto Sans', 'Noto Sans CJK SC', sans-serif"
                            >
                                <MapboxGL.Camera
                                    zoomLevel={11}
                                    centerCoordinate={featureCollection.features[0].geometry.coordinates}
                                />
                                {itemList.length > 0
                                    ? <MapboxGL.ShapeSource
                                        id="pointSource"
                                        shape={featureCollection}
                                    >
                                        {renderLayers(images)}
                                    </MapboxGL.ShapeSource>
                                    : null}
                            </MapboxGL.MapView>
                        </View>
                        <View style={styles.dataContainer} >
                            {session.itemSum
                                ?
                                <View style={{ minHeight: 200 }}>
                                    <ItemsDisplay
                                        itemList={Object.entries(session.itemSum).map(([name, value]) => { return { name, value } })}
                                        totalCount={session.itemCount}
                                    ></ItemsDisplay>
                                </View>
                                : <Title>Total: 0</Title>}
                        </View>
                    </View >
                    : <Text>No data</Text>
            }
        </View >

    )
}

export default MapsPage;