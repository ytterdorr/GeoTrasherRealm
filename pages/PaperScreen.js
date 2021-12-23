import React from "react";
import { View } from 'react-native';
import { Button, Title } from 'react-native-paper';



const PaperScreen = () => {
    return (
        <View>
            <Title>
                Title
            </Title >
            <Button
                mode="outlined"
            >
                Paper Button
            </Button>
        </View>
    )
}

export default PaperScreen