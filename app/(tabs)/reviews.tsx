import React, { useState } from 'react';
import { FlatList, TouchableOpacity, Modal, StyleSheet, Pressable, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
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
        if (review.bid === "") { alert("Please Enter a Book ID"); return; }
        if (review.title === "") { alert("Please Enter a Review Title"); return; }
        if (review.body === "") { alert("Please Enter a Review"); return; }
        if (review.rating === "") { alert("Please Enter a Rating"); return; }
        if (isNaN(parseInt(review.bid))) { alert("Book ID must be a number"); return; }
        if (isNaN(parseInt(review.rating))) { alert("Rating must be a number"); return; }
        if (parseInt(review.rating) > 5 || parseInt(review.rating) < 0) { alert("Rating must be between 0 and 5"); return; }
        review.key = uuid();
        review.rating = parseInt(review.rating).toString();
        setReviews((currentReviews) => {
            return [review, ...currentReviews];
        });
        return true;
    };

    const [modalStates, setModalStates]: [modalStates: Array<boolean>, setModalStates: Function] = useState([]);

    reviews.map((review) => modalStates.push(false));

    function toggleModal(index: number) {
        const newModalStates = [...modalStates];
        newModalStates[index] = !newModalStates[index];
        setModalStates(newModalStates);
    }

    return (
        <Pressable style={globalStyles.fill} onPressOut={() => {
            Keyboard.dismiss();
        }}>
            <View style={globalStyles.fill}>
                <KeyboardAvoidingView style={globalStyles.container}>
                    <FlatList style={globalStyles.flex_1} data={reviews} renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => {
                            toggleModal(index);
                        }}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalStates[index]}
                                onRequestClose={() => {
                                    toggleModal(index);
                                }}
                            >
                                <View style={{ flex: 1 }}>
                                    <ReviewDetails review={item} toggleModal={toggleModal} index={index} />
                                </View>
                            </Modal>
                            <Card>
                                <Text style={globalStyles.title}>{item.title}</Text>
                            </Card>
                        </TouchableOpacity>
                    )} />
                    <Pressable style={globalStyles.flex_1} onPressOut={(e) => { e.stopPropagation(); }}>
                        <ReviewForm addReview={addReview} />
                    </Pressable>
                </KeyboardAvoidingView>
            </View>
        </Pressable>
    );

}

