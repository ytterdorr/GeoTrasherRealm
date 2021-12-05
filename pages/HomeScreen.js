import React from "react";
import { View } from 'react-native';
import MyButton from './components/MyButton';
import MyText from './components/MyText';

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
            <MyButton
                title="New session"
                customClick={() => navigation.navigate('SessionScreen')}
            />
            <MyButton
                title="test screen"
                customClick={() => navigation.navigate('TestScreen')}
            />
        </View>
    );
}

export default HomeScreen;
