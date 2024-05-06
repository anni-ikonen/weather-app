import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper'

export default function Favorites({ onClose, favorites, deleteCity }) {
    console.log("Favorites:", favorites)

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title>Your favorites</Title>
                <FlatList
                    style={styles.flatlist}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <Card.Content style={styles.item}>
                            <Paragraph>{item.cityname}</Paragraph>
                            <Paragraph style={{ color: '#0000ff' }} onPress={() => deleteCity(item.id)}>Delete</Paragraph>
                        </Card.Content>}
                    data={favorites}
                />
            </Card.Content>
            <Card.Actions>
                <Button onPress={onClose}>Close</Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
    },
    flatlist: {
        marginLeft: "5%",
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
})
