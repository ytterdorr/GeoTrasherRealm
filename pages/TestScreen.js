import { tsConstructorType } from '@babel/types';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import realm, { getAllSessions, deleteSessionById } from './realmSchemas';

class TestScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            detailsIds: {}
        }
    }

    toggleShowDetails = (session_id) => {
        console.log("Toggle show id")
        console.log(this.state.detailsIds)
        const tmpDetails = this.state.detailsIds;
        tmpDetails[session_id] = !tmpDetails[session_id];
        this.setState({ detailsIds: tmpDetails });
    }

    render() {
        return (
            <View>
                <Text>
                    This is test screen
                </Text>
                {getAllSessions().map((session) => {
                    console.log(session);
                    return <TouchableOpacity
                        key={session.session_name + Math.random(1, 100)}
                        onPress={() => this.toggleShowDetails(session.session_id)}>
                        <Text>{session.session_name}</Text>
                        {
                            this.state.detailsIds[session.session_id] ? (


                                <View>
                                    <Text>Items</Text>
                                    {session.items.map((item) => (
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text>{item.name}</Text>
                                        </View>
                                    )

                                    )}
                                </View>
                            )
                                : null

                        }
                    </TouchableOpacity>
                })}
            </View >
        )
    }
}


const TestScreenOld = () => {
    const [detailsIds, setDetailsIds] = useState({});

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
                    }
                }
            ]
        )
    }

    useEffect(() => {
        console.log("State changed!")
    }, [detailsIds])

    const toggleShowDetails = (session_id) => {
        console.log("Toggle show id")
        console.log(detailsIds)
        const tmpDetails = detailsIds;
        tmpDetails[session_id] = !tmpDetails[session_id];
        setDetailsIds(tmpDetails);
    }

    const getSessions = async () => {
        const sessions = await getAllSessions();
        return sessions;
    }
    return (
        <View>
            <Text>
                This is test screen
            </Text>
            {getAllSessions().map((session) => {
                console.log(session);
                return <TouchableOpacity
                    key={session.session_name + Math.random(1, 100)}
                    onPress={() => toggleShowDetails(session.session_id)}>
                    <Text>{session.session_name}</Text>
                    {detailsIds[session.session_id] ? (
                        <View>
                            <Text>Items</Text>
                            {session.items.map((item) => (
                                <View style={{ flexDirection: 'column' }}>
                                    <Text>{item.name}</Text>
                                </View>
                            )

                            )}
                        </View>
                    )
                        : null
                    }
                    }
                </TouchableOpacity>
            })}
        </View >
    )
}

export default TestScreen;