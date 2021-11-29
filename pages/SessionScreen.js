import React from "react";
import { View, Button } from 'react-native';
import MyButton from './components/MyButton';
import MyText from './components/MyText';


const SessionScreen = ({ navigation }) => {

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column',
            }}>
            <MyText text="Session" />
            <MyButton
                title="End Session"
                customClick={() => navigation.navigate('HomeScreen')}
            />
            <MyButton title="Go back" customClick={() => navigation.goBack()} />
        </View>
    )
}

export default SessionScreen;
