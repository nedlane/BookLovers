import React, { useState } from 'react';
import { FlatList, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { View, Text } from '../../components/Themed';
import { ReviewForm } from '../../components/ReviewForm';
import { Card } from '../../components/Card';
import { ReviewDetails } from '../../components/ReviewDetails';
import { globalStyles } from '../../constants/styles';
import { v4 as uuid } from 'uuid';

export default function reviewPage() {
    const [reviews, setReviews] = useState([
        { bid: "1", title: 'Harry Potter #1', rating: "5", body: 'lorem ipsum', key: '1' },
        { bid: "2", title: 'Harry Potter #2', rating: "4", body: 'lorem ipsum', key: '2' },
        { bid: "3", title: 'Harry Potter #3', rating: "3", body: 'lorem ipsum', key: '3' },
    ]);

    const addReview = (review: { bid: string, title: string, rating: string, body: string, key: string }) => {
        console.log(parseInt(review.rating));
        if (review.bid === "" || review.title === "" || review.rating === "" || review.body === "" || isNaN(parseInt(review.rating)) || parseInt(review.rating) > 5 || parseInt(review.rating) < 0) return;
        review.key = uuid();
        review.rating = parseInt(review.rating).toString();
        setReviews((currentReviews) => {
            return [review, ...currentReviews];
        });
        return true;
    };

    const [modalStates, setModalStates]: [modalStates: Array<boolean>, setModalStates: Function] = useState([]);

    reviews.map((review) => modalStates.push(false));

    return (
        <View style={globalStyles.container}>
            <ScrollView style={styles.flex_1}>
                <FlatList data={reviews} renderItem={({ item, index }) => (



                    <TouchableOpacity onPress={() => {
                        const newModalStates: Array<boolean> = [...modalStates];
                        newModalStates[index] = !newModalStates[index];
                        setModalStates(newModalStates);
                    }}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalStates[index]}
                            onRequestClose={() => {
                                const newModalStates = [...modalStates];
                                newModalStates[index] = !newModalStates[index];
                                setModalStates(newModalStates);
                            }}
                        >
                            <ReviewDetails review={item} />
                        </Modal>
                        <Card>
                            <Text style={globalStyles.title}>{item.title}</Text>
                        </Card>
                    </TouchableOpacity>
                )
                } />
            </ScrollView>

            < ReviewForm addReview={addReview} style={styles.flex_1} />
        </View >
    );
}

const styles = StyleSheet.create({
    flex_1: {
        flex: 1,
    },
});