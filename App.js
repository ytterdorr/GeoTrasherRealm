import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './pages/HomeScreen';
import SessionDataScreen from './pages/SessionDataScreen';
import SessionBase from './pages/SessionBase';
import MapsPage from './pages/MapsPage';
import RNFetchWeird from './pages/RNFetchWeird';

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
                        name="SessionBase"
                        component={SessionBase}
                        options={{ title: "Session" }} />

                    <Stack.Screen
                        name="MapsPage"
                        component={MapsPage}
                        options={{ title: "MapsPage" }} />

                    <Stack.Screen
                        name="RNFetchWeird"
                        component={RNFetchWeird}
                        options={{ title: "RNFetchWeird" }} />

                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default App;
