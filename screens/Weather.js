import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { API_KEY } from '@env';

export default function Weather({ city, onClose }) {
    const [weather, setWeather] = useState({
        city: '',
        weather: '',
        temperature: '',
        feels: '',
        humidity: ''
    });

    useEffect(() => {
        fetchCityData();
    }, []);

    const fetchCityData = () => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
            .then(response => response.json())
            .then(responseData => {
                const lat = responseData[0].lat;
                const lon = responseData[0].lon;
                console.log("Latitude:", lat, "Longitude:", lon); 
                fetchWeather(lat, lon);
            })
            .catch(error => console.error("Error fetching city data", error));
    }

    const fetchWeather = (lat, lon) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(responseData => {
                console.log("Weather Data:", responseData); 
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
            <Card style={styles.card}>
                <Card.Content>
                    <Title>{weather.city}</Title>
                    <Paragraph>Weather: {weather.weather}</Paragraph>
                    <Paragraph>Temperature: {Math.round(weather.temperature)} °C</Paragraph>
                    <Paragraph>Feels like: {Math.round(weather.feels)} °C</Paragraph>
                    <Paragraph>Humidity: {weather.humidity}%</Paragraph>
                </Card.Content>
                <Card.Actions>
                <Button>Save to favorites</Button>
                    <Button onPress={onClose}>Close</Button>
                </Card.Actions>
            </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
    },
});
