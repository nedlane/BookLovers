import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Modal, StyleSheet, Pressable, ScrollView } from 'react-native';
import { View, Text } from './Themed';
import { ReviewForm } from './ReviewForm';
import { Card } from './Card';
import { ReviewDetails } from './ReviewDetails';
import { globalStyles } from '../constants/styles';
import { v4 as uuid } from 'uuid';
import { KeyboardDismiss } from './KeyboardDismiss';
import { useAuth } from '../contexts/authContext';
import { postRequest } from '../services/postRequest';
import { v4 } from 'uuid';
import { set } from 'react-hook-form';

export function ReviewPage({ close, meetingid }: any) {
    const [reviews, setReviews] = useState([] as { bid: string; title: string; rating: string; body: string; key: string; }[]);

    const { authData } = useAuth();

    const addReview = async (review: { title: string, rating: string, body: string, key?: string }) => {
        if (!authData) { alert("Invalid Creds."); return; }
        if (review.title === "") { alert("Please Enter a Review Title"); return; }
        if (review.body === "") { alert("Please Enter a Review"); return; }
        if (review.rating === "") { alert("Please Enter a Rating"); return; }
        if (isNaN(parseInt(review.rating))) { alert("Rating must be a number"); return; }
        if (parseInt(review.rating) > 5 || parseInt(review.rating) < 0) { alert("Rating must be between 0 and 5"); return; }
        review.key = v4();
        review.rating = parseInt(review.rating).toString();

        if (await postRequest("/mobile/addreview.php", { meetingid: meetingid, title: review.title, rating: review.rating, body: review.body, token: authData.token, userid: authData.userid })) {
            setReviews((currentReviews: any) => {
                return [review, ...currentReviews];
            });
            return true;
        };
        return false;

    };

    const [modalStates, setModalStates]: [modalStates: Array<boolean>, setModalStates: Function] = useState([]);

    reviews.map((review) => modalStates.push(false));

    function openModal(index: number) {
        const newModalStates = [...modalStates];
        newModalStates[index] = true;
        setModalStates(newModalStates);
    }

    function closeModal(index: number) {
        const newModalStates = [...modalStates];
        newModalStates[index] = false;
        setModalStates(newModalStates);
    }

    const fetchReviews = async (meetingid: string) => {
        if (!authData) return;
        const fetchedReviews = await postRequest("/mobile/getreviews.php", { meetingid: meetingid, token: authData.token, userid: authData.userid });
        if (!fetchedReviews.reviews) return;
        let reviews = fetchedReviews.reviews.map((review: any) => {
            return { uid: review.userid, title: review.title, rating: review.rating, body: review.body, key: v4() };
        });
        setReviews(reviews);
        return (reviews);
    }


    useEffect(() => { fetchReviews(meetingid) }, [authData, meetingid]);



    return (
        <KeyboardDismiss>
            <Pressable style={styles.modalClose} onPress={(e) => { close(); e.stopPropagation }}><Text style={styles.x}>x</Text></Pressable>
            {reviews.length > 0 && <FlatList style={globalStyles.flex_1} data={reviews} renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => {
                    openModal(index);
                }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalStates[index]}
                        onRequestClose={() => {
                            closeModal(index);
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <ReviewDetails review={item} closeModal={() => { closeModal(index); }} index={index} />
                        </View>
                    </Modal>
                    <Card>
                        <Text style={globalStyles.title}>{item.title}</Text>
                    </Card>
                </TouchableOpacity>
            )} />}
            {reviews.length === 0 && <View style={globalStyles.flex_1}>
                <Card>
                    <Text style={globalStyles.title}>No Reviews</Text>
                </Card>
            </View>}
            <Pressable style={globalStyles.flex_1} onPressOut={(e) => { e.stopPropagation(); }}>
                <ScrollView>
                    <ReviewForm addReview={addReview} />
                </ScrollView>
            </Pressable>
        </KeyboardDismiss>
    );

}

const styles = StyleSheet.create({
    modalClose: {
        position: "absolute",
        top: "1em",
        right: "1em",
        zIndex: 1,
    },
    x: {
        fontSize: 30,
        fontWeight: "bold",
        color: "red",
    }
});
