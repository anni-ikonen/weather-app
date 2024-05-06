import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Title, Paragraph } from 'react-native-paper'
import * as Location from 'expo-location'
import { API_KEY } from '@env'

export default function CurrentLocation() {

    const [location, setLocation] = useState({
        lat: '',
        lon: ''
    })

    const [weather, setWeather] = useState({
        city: '',
        weather: '',
        temperature: '',
        feels: '',
        humidity: ''
    })

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert('No permission to get location')
                return
            }
            let locationData = await Location.getCurrentPositionAsync({})
            setLocation({
                lat: locationData.coords.latitude,
                lon: locationData.coords.longitude
            })
        })()
    }, [])

    useEffect(() => {
        if (location.lat !== '' && location.lon !== '') {
            fetchWeather()
        }
    }, [location])

    const fetchWeather = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(responseData => {
                console.log("Weather Data:", responseData)
                setWeather({
                    city: responseData.name,
                    weather: responseData.weather[0].main,
                    temperature: responseData.main.temp,
                    feels: responseData.main.feels_like,
                    humidity: responseData.main.humidity
                })
            })
            .catch(error => console.error("Error fetching weather data", error));
    }

    return (
        <View style={styles.card}>
            <Title>Current weather at your location!</Title>
            <Paragraph>City: {weather.city}</Paragraph>
            <Paragraph>Weather: {weather.weather}</Paragraph>
            <Paragraph>Temperature: {Math.round(weather.temperature)} °C</Paragraph>
            <Paragraph>Feels like: {Math.round(weather.feels)} °C</Paragraph>
            <Paragraph>Humidity: {weather.humidity}%</Paragraph>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
})
