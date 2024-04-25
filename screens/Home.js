import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function Home() {


 return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Search by city'
                returnKeyType="default"
            />
            <Button
                style={styles.button}
                title="Search"
            />
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
