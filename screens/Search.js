import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Modal, Button } from 'react-native-paper';
import Weather from './Weather';
import Favorites from './Favorites';
import CurrentWeather from './CurrentWeather';

export default function Search() {
    const [city, setCity] = useState('');
    const [showWeather, setShowWeather] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false)

    const handleSearch = () => {
        if (city !== '') {
        setShowWeather(true);
        }
    }

    const handleCloseWeather = () => {
        setShowWeather(false);
        setCity('')
    }

    const handleShowFavorites = () => {
        setShowFavorites(true)
    }

    const handleCloseFavorites = () => {
        setShowFavorites(false)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Search by city'
                returnKeyType="default"
                value={city}
                onChangeText={text => setCity(text)}
            />
            <Button
                style={styles.button}
                onPress={handleSearch}
            >Search</Button>
            <Button
                style={styles.button}
                onPress={handleShowFavorites}
            >Your favorites!</Button>
            <CurrentWeather/>
            <Modal visible={showWeather}>
                <Weather city={city} onClose={handleCloseWeather} />
            </Modal>
            <Modal visible={showFavorites}>
                <Favorites onClose={handleCloseFavorites}/>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        fontSize: 20,
        width: 200,
        marginTop: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        padding: 8,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#C0DAFF'
    }
});
