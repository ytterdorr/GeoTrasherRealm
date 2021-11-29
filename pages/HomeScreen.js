import React from "react";
import { View } from 'react-native';
import MyButton from './components/MyButton';
import MyText from './components/MyText';
import Realm from 'realm';
import { sessionSchema, itemSchema } from "./realmSchemas";
let realm;

// TODO:
// (Long term) Figure out how to handle schema updates
// Save items to database
// Add more data to items
// - timestamp
// - Geoposition
// Add KeyEvent handler

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log("sessionSchema", sessionSchema)

        realm = new Realm({
            path: 'GeoTrasherData.realm',
            schema: [itemSchema, sessionSchema
            ]
        });
    }

    render() {
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
                    customClick={() => this.props.navigation.navigate('SessionScreen')}
                />
            </View>
        );
    }
}
