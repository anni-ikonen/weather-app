import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { Modal } from 'react-native-paper';
import Weather from './Weather';

export default function Search() {
    const [city, setCity] = useState('');
    const [showWeather, setShowWeather] = useState(false);

    const handleSearch = () => {
        setShowWeather(true);
    }

    const handleCloseWeather = () => {
        setShowWeather(false);
        setCity('')
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
                    title="Search"
                    onPress={handleSearch}
                />
                <Modal visible={showWeather} onDismiss={handleCloseWeather}>
                    <Weather city={city} onClose={handleCloseWeather} />
                </Modal>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    }
});
