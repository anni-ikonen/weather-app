import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Modal, Button } from 'react-native-paper'
import Weather from './Weather'
import Favorites from './Favorites'
import CurrentWeather from './CurrentWeather'
import * as SQLite from 'expo-sqlite'

export default function Home() {
    const [city, setCity] = useState('')
    const [showWeather, setShowWeather] = useState(false)
    const [showFavorites, setShowFavorites] = useState(false)
    const [favorites, setFavorites] = useState([])

    const handleSearch = () => {
        if (city !== '') {
            setShowWeather(true)
        }
    }

    const handleCloseWeather = () => {
        setShowWeather(false)
        setCity('')
    }

    const handleShowFavorites = () => {
        setShowFavorites(true)
    }

    const handleCloseFavorites = () => {
        setShowFavorites(false)
    }

    const db = SQLite.openDatabase('favoritesdb.db')

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists favorites (id integer primary key not null, cityname text);')
        }, () => console.error("Error when creating DB"), updateList)
    }, [])

    const saveCity = () => {
        db.transaction(tx => {
            tx.executeSql('insert into favorites (cityname) values (?);', [city])
        }, null, updateList
        )
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from favorites;', [], (_, { rows }) =>
                setFavorites(rows._array)
            )
        }, null, null);
    }
    const deleteCity = (id) => {
        db.transaction(
            tx => {
                tx.executeSql(`delete from favorites where id = ?;`, [id])
            }, null, updateList
        )
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
            <CurrentWeather />
            <Modal visible={showWeather}>
                <Weather city={city} onClose={handleCloseWeather} saveCity={saveCity} />
            </Modal>
            <Modal visible={showFavorites}>
                <Favorites onClose={handleCloseFavorites} favorites={favorites} deleteCity={deleteCity} />
            </Modal>
        </View>
    )
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
})
