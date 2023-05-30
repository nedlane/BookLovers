import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable, ScrollView } from 'react-native';
import { View, Text } from './Themed';
import { ReviewForm } from './ReviewForm';
import { Card } from './Card';
import { globalStyles } from '../constants/styles';
import { KeyboardDismiss } from './KeyboardDismiss';
import { useAuth } from '../contexts/authContext';
import { postRequest } from '../services/postRequest';
import { v4 } from 'uuid';
import { ReviewList } from './ReviewList'
import { set } from 'react-hook-form';
import { Rating } from './ratings';
import { parse } from 'expo-linking';

export function ReviewPage({ close, meetingid }: any) {
    const [reviews, setReviews] = useState([] as { bid: string; title: string; rating: string; body: string; key: string; }[]);
    const [avgRating, setAvgRating] = useState(0);

    const { authData } = useAuth();

    const addReview = async (review: { title: string, rating: string, body: string }) => {
        if (!authData) { alert("Invalid Creds."); return false; }
        if (review.title === "") { alert("Please Enter a Review Title"); return false; }
        if (review.body === "") { alert("Please Enter a Review"); return false; }
        if (review.rating === "") { alert("Please Enter a Rating"); return false; }
        if (isNaN(parseFloat(review.rating))) { alert("Rating must be a number"); return false; }
        if (parseFloat(review.rating) > 5 || parseFloat(review.rating) < 1) { alert("Rating must be between 1 and 5"); return false; }
        // if (parseFloat(review.rating) % 0.5 !== 0) { alert("Rating must be a multiple of 0.5"); return false; }
        review.rating = parseFloat(review.rating).toString();

        if (await postRequest("/mobile/addreview.php", { meetingid: meetingid, title: review.title, rating: review.rating, body: review.body, token: authData.token, userid: authData.userid })) {
            await fetchReviews(meetingid);
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
        setAvgRating(fetchedReviews.average);
        return (reviews);
    }


    useEffect(() => { fetchReviews(meetingid) }, [authData, meetingid]);



    return (
        <KeyboardDismiss>
            <Pressable style={styles.modalClose} onPress={(e) => { close(); e.stopPropagation }}><Text style={styles.x}>x</Text></Pressable>
            {reviews.length > 0 && ReviewList(reviews, openModal, modalStates, closeModal)}
            {reviews.length === 0 && <View style={globalStyles.flex_1}>
                <Card>
                    <Text style={globalStyles.title}>No Reviews</Text>
                </Card>
            </View>}
            <Pressable style={globalStyles.flex_1} onPressOut={(e) => { e.stopPropagation(); }}>
                {reviews.length > 0 && <Text style={{ alignSelf: "center" }}>Average: <Rating rating={avgRating} /></Text>}
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


