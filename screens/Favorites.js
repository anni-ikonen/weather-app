import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
export default function Favorites( {onClose} ) {

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title>Your favorites</Title>
            </Card.Content>
            <Card.Actions>
                <Button onPress={onClose}>Close</Button>
            </Card.Actions>
        </Card>
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
        backgroundColor: '#C0DAFF'
    }
});
