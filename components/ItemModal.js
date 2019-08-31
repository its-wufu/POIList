import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    Share,
    Linking,
    Platform
} from 'react-native';
import { List, ListItem } from 'native-base';
import axios from 'axios';
import styled from 'styled-components';

import Button from './Button';
import { highlight, credentials } from '../config';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Left = styled.View`
    align-self: flex-start;
    flex: 1;
`;
const Right = styled.View`
    flex: 1;
    align-items: flex-start;
    color: #666;
`;

// ItemModal is the subscreen, which shows the venue details.
const ItemModal = ({ id }) => {
    // State
    const [loading, setLoading] = useState(true);
    const [venue, setVenue] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = `https://api.foursquare.com/v2/venues/${id}?`;
        const params = new URLSearchParams(credentials);
        axios
            .get(url + params)
            .then(res => {
                setVenue(res.data.response.venue);
                setLoading(false);
                // console.log(res.data.response.venue) // If you want to see the response
            })
            .catch(err => {
                console.error(err);
                setError(err);
            });
    }, []);

    // onShare shares the 'canonicalUrl' of this venue.
    const onShare = async url => {
        try {
            const result = await Share.share({
                message: url
            });
            // TODO: Do something with result
            /*
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
            */
        } catch (error) {
            console.error(error.message);
        }
    };

    if (error) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Error while loading data...</Text>
            </View>
        );
    }

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={{
                position: 'absolute',
                height: screenHeight - 60,
                width: screenWidth,
                top: 60,
                bottom: 0,
                left: 0,
                right: 0
            }}
        >
            {venue.bestPhoto && (
                <Image
                    source={{
                        uri: venue.bestPhoto.prefix + '300x500' + venue.bestPhoto.suffix
                    }}
                    style={{ width: screenWidth, height: 300 }}
                />
            )}
            <Text
                style={{
                    alignSelf: 'center',
                    fontSize: 24,
                    color: highlight,
                    marginVertical: 20
                }}
            >
                {venue.name}
            </Text>
            {venue.contact && venue.contact.phone && (
                <View>
                    <Text style={{ alignSelf: 'center' }}>
                        Contact: {venue.contact.formattedPhone || venue.contact.phone}
                    </Text>
                    <Button
                        style={{ alignSelf: 'center' }}
                        text='Call'
                        onPress={() => Linking.openURL(`tel:${venue.contact.phone}`)}
                    />
                </View>
            )}
            {venue.location && venue.location.lat && venue.location.lng && (
                <Button
                    style={{ alignSelf: 'center' }}
                    text='Open in Maps'
                    onPress={() => {
                        Linking.openURL(
                            Platform.OS === 'ios' // if not it must me 'android'
                                ? `http://maps.apple.com/?q=${venue.name}&ll=${venue.location.lat},${venue.location.lng}`
                                : `geo:${venue.location.lat},${venue.location.lng}?q=${venue.name}`
                        );
                    }}
                />
            )}
            <List>
                <ListItem
                    itemDivider
                    style={{
                        borderBottomColor: highlight,
                        borderBottomWidth: 2
                    }}
                >
                    <Text
                        style={{
                            color: highlight
                        }}
                    >
                        Additional Info
                    </Text>
                </ListItem>
                {venue.attributes &&
                    venue.attributes.groups &&
                    venue.attributes.groups.length > 0 &&
                    venue.attributes.groups.map(obj => (
                        <ListItem key={Math.random(100000)}>
                            <Left>
                                <Text>{obj.items[0].displayName || ''}</Text>
                            </Left>
                            <Right>
                                <Text>{obj.items[0].displayValue || ''}</Text>
                            </Right>
                        </ListItem>
                    ))}
            </List>
            <Button
                style={{ alignSelf: 'center', marginBottom: 100 }}
                text='Share!'
                onPress={() => onShare(venue.canonicalUrl)}
            />
        </ScrollView>
    );
};

export default ItemModal;
