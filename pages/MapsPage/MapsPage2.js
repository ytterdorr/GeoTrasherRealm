import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import config from 'react-native-ultimate-config'
import MapboxGL from '@react-native-mapbox-gl/maps';
import { getSessionById } from '../realmSchemas';
import { getFormattedDateFromTimestamp } from '../assets/utilities';

import images from '../assets/images';
import ItemsDisplay from '../components/ItemsDisplay';

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
        flex: 1
    },
    dataContainer: {
        height: '60%'
    }
})

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

const MapsPage = ({ route }) => {

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
        console.log("images", images)
        return Object.entries(images).map(([imageName, imagePath]) => {
            console.log("imageName", imageName, "imagePath", imagePath)
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