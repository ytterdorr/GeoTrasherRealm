import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { getFormattedDateFromTimestamp } from '../assets/utilities';
import ItemsDisplay from './ItemsDisplay';
import { writeSessionItemsToCsv } from '../assets/utilities';

const styles = StyleSheet.create({
    sessionButton: {
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        color: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selected: {
        backgroundColor: 'skyblue'
    },
    tableCellText: {
        fontSize: 20,
    }
})

const SessionButton = ({ session, deleteSessionPrompt, navigation }) => {
    const [showDetails, setShowDetails] = useState(false);

    const goToDetails = () => {
        // only go to map page if there is items. Otherwise do nothing?
        if (session.items.length) {
            navigation.navigate({
                name: 'MapsPage', params: {
                    sessionId: session.session_id
                }
            })
        }
    }

    const toggleShowDetails = () => {
        setShowDetails(!showDetails);
    }
    return (
        <View>
            <TouchableOpacity
                style={showDetails ? { ...styles.sessionButton, ...styles.selected } : styles.sessionButton}
                onPress={toggleShowDetails}
                onLongPress={() => { goToDetails() }}
            >
                <Text style={{ fontSize: 20 }}>{session.session_name}</Text>
                <Text style={{ fontSize: 20 }}>{`Items: ${session.itemCount}`}</Text>
                <Button
                    icon='trash-can-outline'
                    color='red'
                    labelStyle={{ fontSize: 24 }}
                    onPress={() => deleteSessionPrompt(session)}>
                </Button>
            </TouchableOpacity>
            {showDetails ?
                session.items.length ?
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 22 }}>{getFormattedDateFromTimestamp(session.items[0].location.timestamp)}</Text>
                        <Button mode="contained" style={{ width: '90%', margin: 5 }}
                            onPress={() => writeSessionItemsToCsv(session.items, session.session_name.replace(" ", "_"))}
                        >Export csv</Button>
                        <Button
                            mode="contained"
                            onPress={() => goToDetails()}
                            style={{ width: '90%', margin: 5 }}
                        >Show map</Button>
                        <View style={{ maxHeight: 200, }}>
                            <ItemsDisplay
                                itemList={Object.entries(session.itemSum).map(
                                    ([name, value]) => { return { name, value } })}
                                totalCount={session.itemCount}
                            />
                        </View>
                    </View>
                    : <View style={{ alignItems: 'center', padding: 10 }}><Text>No data</Text></View>
                : null
            }
        </View >
    )
}

export default SessionButton;