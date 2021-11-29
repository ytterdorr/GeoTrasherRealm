import React from "react";
import { View } from 'react-native';
import MyButton from './components/MyButton';
import MyText from './components/MyText';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        realm = new Realm({
            path: 'GeoTrasherData.realm',
            schema: [
                {
                    name: 'session_details',
                    properties: {
                        session_id: { type: 'int', default: 0 },
                        session_name: 'string',
                    },
                },
            ],
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
