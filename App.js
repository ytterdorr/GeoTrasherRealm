import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './pages/HomeScreen';
import SessionDataScreen from './pages/SessionDataScreen';
import SessionLookVertical from './pages/SessionLookVertical';
import SessionButtonTop from './pages/SessionButtonTop';
import SessionBase from './pages/SessionBase';
import MapsPage from './pages/MapsPage';

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
                        name="SessionButtonTop"
                        component={SessionButtonTop}
                        options={{ title: "Button on top" }} />

                    <Stack.Screen
                        name="SessionBase"
                        component={SessionBase}
                        options={{ title: "Session" }} />

                    <Stack.Screen
                        name="MapsPage"
                        component={MapsPage}
                        options={{ title: "MapsPage" }} />

                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default App;
