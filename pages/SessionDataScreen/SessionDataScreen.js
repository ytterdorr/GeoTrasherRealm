import React, { useState } from 'react';
import { Alert, ScrollView, Text } from 'react-native';
import { getAllSessions, deleteSessionById } from '../realmSchemas';
import SessionButton from '../components/SessionButton';
import TotalsDisplay from '../components/TotalsDisplay';



const SessionDataScreen = () => {

    const [sessions, setSessions] = useState(getAllSessions());
    console.log("Sessions in sessionDataScreen")

    const deleteSessionPrompt = (session) => {
        Alert.alert(
            "Delete session",
            `Are you sure you want to delete session: '${session.session_name}'?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel pressed"),
                    style: "cancel"
                },
                {
                    text: "DELETE", onPress: () => {
                        deleteSessionById(session.session_id)
                        setSessions(getAllSessions());
                    }
                }
            ]
        )
    }

    return (
        <ScrollView style={{ height: '100%' }}>
            <TotalsDisplay sessions={sessions} style={{ height: '30%' }}></TotalsDisplay>
            {sessions && sessions.length > 0 ? sessions.map((session, index) => {
                console.log(session);
                return <SessionButton key={`${session.session_name}_${index}`} session={session} deleteSessionPrompt={deleteSessionPrompt} />
            })
                : <Text>No session data</Text>
            }
        </ScrollView>
    )
}

export default SessionDataScreen;