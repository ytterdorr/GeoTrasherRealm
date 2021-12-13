import React, { useState } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { getAllSessions, deleteSessionById } from './realmSchemas';
import SessionButton from './components/SessionButton';

const SessionDataScreen = () => {

    const [sessions, setSessions] = useState(getAllSessions());

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
        <ScrollView>
            <Text>
                This is test screen
            </Text>
            {sessions.map((session, index) => {
                console.log(session);
                return <SessionButton key={`${session.session_name}_${index}`} session={session} deleteSessionPrompt={deleteSessionPrompt} />
            })}
        </ScrollView>
    )
}

export default SessionDataScreen;