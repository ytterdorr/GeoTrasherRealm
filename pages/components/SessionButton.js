import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DataTable, Button } from 'react-native-paper';


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

const SessionDataTable = ({ session }) => {
    const sessionHasData = session.itemCount;

    const getFormattedDate = () => {
        const timestamp = session.items[0].location.timestamp
        let date = new Date(timestamp)
        const offset = date.getTimezoneOffset()
        date = new Date(date.getTime() - (offset * 60 * 1000))
        const times = date.toISOString().split('T')
        return `${times[0]} ${times[1].split(".")[0]}`
    }


    return (<View>
        {sessionHasData
            ?
            <View>

                <DataTable style={{ paddingLeft: 20, paddingRight: 20 }}>

                    <DataTable.Header>
                        <DataTable.Title>
                            <Text style={{ fontSize: 22 }}>{getFormattedDate()}</Text>
                        </DataTable.Title>
                    </DataTable.Header>

                    {Object.keys(session.itemSum).map(itemName => {
                        return (
                            <DataTable.Row key={`${session.session_name}_${itemName}`}>
                                <DataTable.Cell >
                                    <Text style={styles.tableCellText}>
                                        {itemName}
                                    </Text>
                                </DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={styles.tableCellText}>
                                        {session.itemSum[itemName]}
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}

                </DataTable>
                <View style={{ justifyContent: 'center', padding: 5, marginBottom: 10 }}>
                    <Button mode="contained" onPress={() => console.log("more details")}>More Details</Button>
                </View>

            </View>
            : <Text>No data</Text>
        }
    </View>)

}

const SessionButton = ({ session, deleteSessionPrompt }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleShowDetails = () => {
        setShowDetails(!showDetails);
    }
    return (
        <View>
            <TouchableOpacity
                style={showDetails ? { ...styles.sessionButton, ...styles.selected } : styles.sessionButton}
                onPress={toggleShowDetails}
                onLongPress={() => { console.log("Long press") }}
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
            {showDetails ? (
                <SessionDataTable session={session} />
            )
                : null
            }
        </View>
    )
}

export default SessionButton;