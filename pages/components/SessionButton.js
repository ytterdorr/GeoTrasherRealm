import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    sessionButton: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        color: 'black',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selected: {
        backgroundColor: 'skyblue'
    }
})

const SessionButton = ({ session, deleteSessionPrompt }) => {
    const [showDetails, setShowDetails] = useState(false);



    const toggleShowDetails = () => {
        setShowDetails(!showDetails);
    }
    return (
        <View>
            <TouchableOpacity style={showDetails ? { ...styles.sessionButton, ...styles.selected } : styles.sessionButton} onPress={toggleShowDetails}>
                <Text>{session.session_name}</Text>
                <Text style={{ color: 'red' }} onPress={() => deleteSessionPrompt(session)}>Delete</Text>
            </TouchableOpacity>
            {showDetails ? (
                <View>
                    {/* Item details */}
                    {session.items.map((item, index) => (<View>
                        <Text key={`${item.name}${index}`}>{item.name}</Text>

                        <Text key={`${item.name}${index}_latitude`}>{item.location.latitude ? item.location.latitude : null}</Text>
                        <Text key={`${item.name}${index}_longitude`}>{item.location.longitude ? item.location.longitude : null}</Text>
                        <Text key={`${item.name}${index}_time`}>{item.location.timestamp ? new Date(item.location.timestamp).toString() : null}</Text>
                    </View>
                    )

                    )}
                    {/* Sum object */}
                    {session.itemSum ? Object.entries(session.itemSum).map(([key, value]) => {
                        return <Text key={`${session.session_id}_${key}_key`}>{`${key}: ${value}`}</Text>
                    })
                        : <Text>No sum object</Text>
                    }
                </View>
            )
                : null
            }
        </View>
    )
}

export default SessionButton;