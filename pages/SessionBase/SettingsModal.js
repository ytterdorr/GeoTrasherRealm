import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import { Portal, Modal, Text, Button, RadioButton, TextInput, Title } from 'react-native-paper';

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
    clickerTime,
    views,

}) => {

    const [multiClickTime, setMultiClickTime] = React.useState(clickerTime.current)
    const [radioChoice, setRadioChoice] = React.useState(views.selected)
    console.log("visible:", visible)

    const onRadioChange = async (choice) => {
        await setRadioChoice(choice)
        views.set(choice)
    }

    const onChangeText = (text) => {
        const number = Number(text)
        if (number >= 0 && number <= 5000 || text === "") {
            setMultiClickTime(text)
        }
        // Keep text numbers and max 4000?
    }

    const save = () => {
        console.log("Setting view?", radioChoice)
        views.set(radioChoice)
        if (multiClickTime === "") {
            clickerTime.set(10)
        } else {
            clickerTime.set(Number(multiClickTime))
        }
        onDismiss()
    }

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={() => onDismiss()}
                contentContainerStyle={{ ...modalStyle, ...contentContainerStyle }}
            >


                <Title>Set multiclick timer (ms)</Title>
                <View style={{ height: 30, width: 60 }}>

                    <TextInput
                        mode="outlined"
                        value={`${multiClickTime}`}
                        style={{ height: 20, width: 60 }}
                        onChangeText={time => onChangeText(time)}
                    />
                </View>

                <Title style={{ marginTop: 10 }}>Set View Style</Title>
                <RadioButton.Group onValueChange={onRadioChange} value={radioChoice} onPress={() => { }}>
                    {Object.entries(views.available).map(([key, value]) => {
                        return (key === "default" ? null :
                            <TouchableOpacity
                                onPress={() => { onRadioChange(value) }}
                                key={key}
                                style={radioStyle}>
                                <Text style={{ fontSize: 20 }}>{value}</Text>
                                <RadioButton value={value} />
                            </TouchableOpacity>)
                    })}
                </RadioButton.Group>
                <Button mode="contained" onPress={() => { save() }} style={{ width: '80%', borderRadius: 5, marginBottom: 5, marginTop: 10 }}>Save</Button>

            </Modal>
        </Portal >
    )
}

export default SettingsModal;