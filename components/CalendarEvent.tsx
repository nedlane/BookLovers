import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from './Themed';
import { Card } from './Card';

export function Event(props: any) {
    return (
        <Card style={props.style}>
            <Text>{props.event.location}</Text>
        </Card>

    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        padding: 10,
        marginBottom: 10,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 20,
    }
});