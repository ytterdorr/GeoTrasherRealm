import React from "react";
import { View } from 'react-native';

import { Button } from 'react-native-paper';
import { getAllSessions, getSummary } from './realmSchemas';
import TotalsDisplay from "./components/TotalsDisplay";

// TODO:
// (Long term) Figure out how to handle schema updates
// Save items to database
// Add more data to items
// - timestamp
// - Geoposition
// Add KeyEvent handler

const buttonStyle = {
    marginBottom: 15,
    padding: 10,
    fontSize: 20,
}

const HomeScreen = ({ navigation }) => {

    // Todo: add loading?
    const sessions = getAllSessions();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
            <View style={{ height: '30%' }}>

                <TotalsDisplay sessions={sessions}></TotalsDisplay>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 40 }}>
                <Button style={buttonStyle}
                    mode="contained"
                    onPress={() => navigation.navigate('SessionButtonTop')}
                >
                    Session with Button image

                </Button>
                <Button
                    mode="contained"
                    style={buttonStyle}
                    onPress={() => navigation.navigate('SessionBase')}
                >
                    Session Base
                </Button>
                <Button style={buttonStyle}
                    mode="contained"
                    onPress={() => navigation.navigate('SessionDataScreen')}
                >Session Data</Button>
            </View>

        </View >
    );
}

export default HomeScreen;
