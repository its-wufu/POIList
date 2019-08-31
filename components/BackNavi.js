import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import * as Icon from '@expo/vector-icons';

const BackNavi = props => {
    return (
        <View
            style={{
                backgroundColor: 'white',
                height: 60,
                borderBottomColor: '#666',
                borderBottomWidth: 1,
                ...props.style
            }}
        >
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => {
                        if (props.onBackPress) {
                            props.onBackPress();
                        }
                    }}
                    style={{
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Icon.AntDesign
                        onPress={() => {
                            if (props.onBackPress) {
                                props.onBackPress();
                            }
                        }}
                        style={{
                            color: '#666'
                        }}
                        size={26}
                        color={'#666'}
                        name='arrowleft'
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 3 }} />
            <View style={{ flex: 1 }} />
        </View>
    );
};

export default BackNavi;
