import 'react-native-gesture-handler';
import React from 'react';

// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './pages/HomeScreen';
import SessionScreen from './pages/SessionScreen';
import TestScreen from './pages/TestScreen';
import SessionDataScreen from './pages/SessionDataScreen';
import PaperScreen from './pages/PaperScreen';

const Stack = createStackNavigator();


function App() {
    return (
        <PaperProvider>

            <NavigationContainer>
                <Stack.Navigator initialRouteName="HomeScreen">
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{ title: 'Home' }}
                    />
                    <Stack.Screen
                        name="SessionScreen"
                        component={SessionScreen}
                        options={{ title: "Session" }} />

                    <Stack.Screen
                        name="SessionDataScreen"
                        component={SessionDataScreen}
                        options={{ title: 'Session Data' }}
                    />

                    <Stack.Screen
                        name="TestScreen"
                        component={TestScreen}
                        options={{ title: "Test Screen" }} />
                    <Stack.Screen
                        name="PaperScreen"
                        component={PaperScreen}
                        options={{ title: "Paper Screen" }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default App;


// function MyStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name='HomeScreen' component={HomeScreen} />
//             <Stack.Screen name='SessionScreen' component={SessionScreen} />
//         </Stack.Navigator>
//     )
// }

// const App = createStackNavigator({
//     HomeScreen: {
//         screen: HomeScreen,
//         navigationOptions: {
//             title: 'HomeScreen',
//             headerStyle: { backgroundColor: '#3a59b7' },
//             headerTintColor: '#ffffff'
//         },
//     },
//     SessionScreen: {
//         screen: SessionScreen,
//         navigationOptions: {
//             title: 'SessionScreen',
//             headerStyle: { backgroundColor: '#3a59b7' },
//             headerTintColor: '#ffffff'

//         }
//     },
// })

