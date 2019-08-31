import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonComp = ({ onPress, style, color, text, textStyle }) => {
    return (
        <TouchableOpacity
            style={{
                height: 40,
                width: 250,
                borderRadius: 20,
                backgroundColor: color || '#ec7054',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
                ...style
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    fontSize: 16,
                    color: 'white',
                    ...textStyle
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default ButtonComp;
