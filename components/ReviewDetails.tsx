import React from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';
import { View, Text } from './Themed';
import { globalStyles } from '../constants/styles';
import { Rating } from './ratings';
import { Card } from './Card';

export function ReviewDetails({ review, toggleModal, index }: { review: { bid: string, title: string, rating: string, body: string, key: string }, toggleModal: Function, index: number }) {

    return (
        <Pressable onPressOut={() => { toggleModal(index) }} >
            <View style={globalStyles.container}>
                <Card style={styles.card} innerStyle={styles.innerCard}>
                    <Text style={globalStyles.title}>Book: {review.bid}</Text>
                    <Text style={globalStyles.title}>
                        {review.title}
                    </Text>
                    <Text>{review.body}</Text>
                    <View>
                        <Text>Rating: </Text>
                        <Rating rating={parseInt(review.rating)} />
                    </View>
                </Card>
            </View>
        </Pressable >
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

