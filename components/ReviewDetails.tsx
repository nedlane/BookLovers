import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from './Themed';
import { globalStyles } from '../constants/styles';
import { Card } from './Card';

export function ReviewDetails({ review }: { review: { bid: string, title: string, rating: string, body: string, key: string } }) {
    const rating = review.rating;

    return (
        <View style={globalStyles.container}>
            <Card style={styles.card} innerStyle={styles.innerCard}>
                <Text style={globalStyles.title}>Book: {review.bid}</Text>
                <Text style={globalStyles.title}>
                    {review.title}
                </Text>
                <Text>{review.body}</Text>
                <View>
                    <Text>Rating: </Text>
                    <Text>{review.rating}</Text>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '90%',
    },
    innerCard: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

