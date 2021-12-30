import React, { useState } from 'react';
import { View } from 'react-native'
import { Portal, Modal, Text, Button, TextInput, Title } from 'react-native-paper';

const modalStyle = {
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 5,
    padding: 10,
}

const radioStyle = {
    minWidth: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',

}

const SettingsModal = ({
    visible,
    onDismiss,
    contentContainerStyle = {},
    sessionId,
    setSessionName,
}) => {
    const [tmpName, setTmpName] = useState(`Session ${sessionId}`)


    const onTextChange = (name) => {
        setTmpName(name)
    }

    const startPressed = () => {
        setSessionName(tmpName ? tmpName : `Session ${sessionId}`)
        onDismiss()
    }


    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={() => onDismiss()}
                contentContainerStyle={{ ...modalStyle, ...contentContainerStyle }}
            >
                <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10 }}></View>
                <Title>Session Start</Title>
                <Text>Session name:</Text>
                <TextInput
                    mode="outlined"
                    value={`${tmpName}`}
                    style={{ height: 25, width: 150 }}
                    onChangeText={name => onTextChange(name)}
                />
                <Button mode='contained' style={{ width: '90%', marginTop: 15 }} onPress={startPressed}>Start</Button>
            </Modal>
        </Portal >
    )
}

export default SettingsModal;