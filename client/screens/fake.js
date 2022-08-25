import React, { useMemo, memo, useEffect } from 'react'
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const areEqual = (pre, current) => {
    return pre.route.params.index === current.route.params.index;
}

const FakeComponent = React.memo(() => {
    console.log("render profile");
    return(
        <View style={{flex: 1, justifyContent:'center'}}>
            <Text>
                Ahihi
            </Text>
            <Button 
                onPress={() => {
                    navigation.goBack();
                }}
            />

        </View>
    )
}, areEqual);
export default FakeComponent;