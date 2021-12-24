import React from "react";
import { View, Text } from 'react-native';
import { Title } from 'react-native-paper';
import MyButton from './components/MyButton';
import MyText from './components/MyText';
import { Button } from 'react-native-paper';
// import { nicotine } from './assets/images';

// TODO:
// (Long term) Figure out how to handle schema updates
// Save items to database
// Add more data to items
// - timestamp
// - Geoposition
// Add KeyEvent handler

const buttonStyle = {
    marginBottom: 15,
    padding: 10,
    fontSize: 20,
}

const HomeScreen = ({ navigation }) => {

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
            <Title>Hej</Title>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 40 }}>
                <Button style={buttonStyle}
                    mode="contained"
                    onPress={() => navigation.navigate('SessionLookVertical')}
                >
                    Session with icons

                </Button>
                <Button
                    mode="contained"
                    style={buttonStyle}
                    onPress={() => navigation.navigate('SessionWithRotation')}
                >
                    Session with rotation
                </Button>
                <Button style={buttonStyle}
                    mode="contained"
                    onPress={() => navigation.navigate('SessionDataScreen')}
                >Session Data</Button>
            </View>

        </View >
    );
}

export default HomeScreen;
