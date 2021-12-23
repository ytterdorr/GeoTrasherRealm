import React from "react";
import { View } from 'react-native';
import MyButton from './components/MyButton';
import MyText from './components/MyText';
import { Button } from 'react-native-paper';

// TODO:
// (Long term) Figure out how to handle schema updates
// Save items to database
// Add more data to items
// - timestamp
// - Geoposition
// Add KeyEvent handler

const HomeScreen = ({ navigation }) => {

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column',
            }}>
            <MyText text="RealM Example" />
            <Button
                mode="outlined"
                style={{ marginTop: 5 }}
                onPress={() => navigation.navigate('SessionWithRotation')}
            >
                Session with rotation
            </Button>
            {/* <MyButton
                title="New session"
                customClick={() => navigation.navigate('SessionScreen')}
            /> */}
            <MyButton
                title="Session Data"
                customClick={() => navigation.navigate('SessionDataScreen')}
            />

        </View>
    );
}

export default HomeScreen;
