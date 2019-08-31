import React, { useEffect, useState } from 'react';
import { Text, View, Modal, ScrollView, Dimensions } from 'react-native';
import { Input, Label, Item } from 'native-base';
import axios from 'axios';

import ListItem from './ListItem';
import BackNavi from './BackNavi';
import ItemModal from './ItemModal';
import Button from './Button';
import { coords, credentials } from '../config';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Home = () => {
    const [venueList, setVenueList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState([false, null]);
    const [search, setSearch] = useState('coffee');
    const [error, setError] = useState(null);

    // foursquare config
    const url = 'https://api.foursquare.com/v2/venues/explore?';
    const params = new URLSearchParams({
        ...credentials,
        query: search,
        ll: coords,
        limit: '10' // TODO: Pagination
    });

    useEffect(() => {
        onSearch();
    }, []);

    const onSearch = () => {
        setLoading(true);
        axios
            .get(url + params)
            .then(res => {
                let sorted = res.data.response.groups[0].items.sort(
                    (a, b) =>
                        (a.venue.location.distance || 9999) -
                        (b.venue.location.distance || 9999)
                );
                setVenueList(sorted);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err);
            });
    };

    if (error) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Error while loading data...</Text>
            </View>
        );
    }

    return (
        <View>
            <Item floatingLabel style={{ marginTop: 50 }}>
                <Label>Filter</Label>
                <Input onChangeText={text => setSearch(text)} value={search} />
            </Item>
            <Button style={{ alignSelf: 'center' }} text='Search!' onPress={onSearch} />
            {loading ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Loading...</Text>
                </View>
            ) : (
                <ScrollView
                    style={{
                        position: 'absolute',
                        height: screenHeight - 200,
                        width: screenWidth,
                        top: 200,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        paddingBottom: 100
                    }}
                >
                    {venueList.map((item, index) => (
                        <ListItem
                            key={`${index}_${new Date().getTime()}`}
                            item={item}
                            onPress={() => {
                                setModalVisible([true, item.venue.id]);
                            }}
                        />
                    ))}
                    <Modal
                        animationType='slide'
                        transparent={false}
                        visible={modalVisible[0]}
                        onRequestClose={() => {
                            setModalVisible([false, null]);
                        }}
                    >
                        <View>
                            <BackNavi
                                onBackPress={() => setModalVisible([false, null])}
                            />
                            <ItemModal id={modalVisible[1]} />
                        </View>
                    </Modal>
                </ScrollView>
            )}
        </View>
    );
};

export default Home;
