import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { API_KEY } from '@env'

export default function Weather({ city }) {

    const [weather, setWeather] = useState({ city: '', weather: '', temperature: '', feels: '', humidity: '' })

    useEffect(() => {
        fetchCityData()
    }, []);

    // fetches the citys longitude and latitude
    const fetchCityData = () => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
            .then(response => response.json())
            .then(responseData => {
                const lat = responseData[0].lat;
                const lon = responseData[0].lon;

                //setLatitude(lat);
                //setLongitude(lon);
                fetchWeather(lat, lon);
            })
            .catch(error => console.error("Error fetching city data", error));
    }

    // fetches the weather with longitude and latitude
    const fetchWeather = (lat, lon) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(responseData => {
                setWeather({
                    city: responseData.name,
                    weather: responseData.weather[0].main,
                    temperature: responseData.main.temp,
                    feels: responseData.main.feels_like,
                    humidity: responseData.main.humidity
                });
            })
            .catch(error => console.error("Error fetching weather data", error));
    }

    return (
        <View style={styles.container}>
            <Text>City: {weather.city}</Text>
            <Text>Weather: {weather.weather}</Text>
            <Text>Temperature: {Math.round(weather.temperature)} °C</Text>
            <Text>Feels like: {Math.round(weather.feels)} °C</Text>
            <Text>Humidity: {weather.humidity}%</Text>
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