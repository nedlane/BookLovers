import React from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';
import { View, Text } from './Themed';
import { globalStyles } from '../constants/styles';
import { Rating } from './ratings';
import { Card } from './Card';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useThemeColor } from './Themed';


export function ReviewDetails({ review, closeModal, index }: { review: { bid: string, title: string, rating: string, body: string, key: string }, closeModal: VoidFunction, index: number }) {

    return (
        <Pressable onPress={(e) => { closeModal(); e.stopPropagation(); }} style={globalStyles.fill}>
            <View style={globalStyles.container}>
                <Card style={styles.card} innerStyle={styles.innerCard}>
                    <FontAwesome name="close" size={24} color={useThemeColor({}, 'text')} style={{ position: 'absolute', top: -10, right: -10 }} />
                    <Text style={globalStyles.title}>
                        {review.title}
                    </Text>
                    <Text>{review.body}</Text>
                    <View>
                        <Text>Rating: </Text>
                        <Rating rating={parseFloat(review.rating)} />
                    </View>
                </Card>
            </View>
        </Pressable>
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

