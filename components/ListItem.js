import React from 'react';
import { Text, Image, View } from 'react-native';
import styled from 'styled-components';
import * as Icon from '@expo/vector-icons';

import { highlight } from '../config';

const ViewCard = styled.TouchableHighlight`
    padding: 10px;
    height: 85px;
    border-width: 1;
    border-radius: 2;
    border-color: #ec7054;
    shadow-color: #ec7054;
    shadow-opacity: 0.8;
    shadow-radius: 2;
    elevation: 1;
    margin-left: 5;
    margin-right: 5;
    margin-top: 10;
`;

const ListItem = ({ item, onPress }) => {
    let { name, location, categories } = item.venue;
    return (
        <ViewCard onPress={onPress}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20, color: highlight }}>{name}</Text>
                    <Image
                        source={{
                            uri:
                                categories[0].icon.prefix +
                                '32' +
                                categories[0].icon.suffix
                        }}
                        style={{ width: 32, height: 32, tintColor: highlight }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{location.address}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon.MaterialCommunityIcons
                            name='walk'
                            size={16}
                            style={{ marginBottom: -3 }}
                            color={highlight}
                        />
                        <Text>{`${location.distance} m`}</Text>
                    </View>
                </View>
            </View>
        </ViewCard>
    );
};

export default ListItem;
