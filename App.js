import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './pages/HomeScreen';
import SessionDataScreen from './pages/SessionDataScreen';
import SessionLookVertical from './pages/SessionLookVertical';
import SessionBase from './pages/SessionBase';

const Stack = createStackNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'green',
        secondary: 'blue'
    }
}

function App() {
    return (
        <PaperProvider theme={theme}>

            <NavigationContainer>
                <Stack.Navigator initialRouteName="HomeScreen">
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{ title: 'Home' }}
                    />

                    <Stack.Screen
                        name="SessionDataScreen"
                        component={SessionDataScreen}
                        options={{ title: 'Session Data' }}
                    />

                    <Stack.Screen
                        name="SessionLookVertical"
                        component={SessionLookVertical}
                        options={{ title: "Session Look" }} />

                    <Stack.Screen
                        name="SessionBase"
                        component={SessionBase}
                        options={{ title: "Session" }} />

                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default App;
