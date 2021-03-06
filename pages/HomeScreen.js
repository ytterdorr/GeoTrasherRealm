import React, { useState } from "react";
import { View } from 'react-native';

import { Button } from 'react-native-paper';
import { getActiveSession, getAllSessions, getLatestSession, deleteAllSessions } from './realmSchemas';
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
    // const [activeSession, setActiveSession] = useState({ active: false, id: 0 })
    // deleteAllSessions();

    // // Todo: add loading?
    const sessions = getAllSessions();
    const activeSession = getActiveSession();
    const latestSession = getLatestSession();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
            <View style={{ height: '50%' }}>
                <TotalsDisplay sessions={sessions}></TotalsDisplay>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 40 }}>
                <Button
                    mode="contained"
                    style={buttonStyle}
                    onPress={() => navigation.navigate('SessionBase', {
                        activeSession: false
                    })}
                >
                    {"New Session"}
                </Button>
                {activeSession ? <Button
                    mode="contained"
                    style={buttonStyle}
                    onPress={() => navigation.navigate('SessionBase', {
                        activeSession: true
                    })}
                >
                    {"Continue Session"}
                </Button>
                    : null}
                <Button style={buttonStyle}
                    mode="contained"
                    onPress={() => navigation.navigate('SessionDataScreen')}
                >Session Data</Button>
            </View>

        </View >
    );
}

export default HomeScreen;
