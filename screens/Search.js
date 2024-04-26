import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import Weather from './Weather';
export default function Search() {

    const [city, setCity] = useState('')
    const [showWeather, setShowWeather] = useState(false)

    const handleSearch = () => {
        setShowWeather(true)
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
            <View>
                {showWeather && <Weather city={city} />}
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1, //keep it as 1!!
        backgroundColor: '#fff',
        alignItems: 'center',
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
        marginTop: 50,
    }
});
