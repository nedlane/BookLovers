import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View, TextInput } from './Themed';
import { globalStyles } from '../constants/styles';
import { Formik } from 'formik';

export function ReviewForm({ addReview }: { addReview: Function }) {

    return (
        <Formik
            initialValues={{ title: '', body: '', rating: '', bid: '' }}
            onSubmit={(values, actions) => {
                if (addReview(values)) { actions.resetForm() };
            }}
        >
            {props => (
                <View>
                    <TextInput
                        style={globalStyles.input}
                        placeholder='Book ID'
                        onChangeText={props.handleChange('bid')}
                        value={props.values.bid}
                        keyboardType='numeric'
                    />

                    <TextInput
                        style={globalStyles.input}
                        placeholder='Review title'
                        onChangeText={props.handleChange('title')}
                        value={props.values.title}
                    />

                    <TextInput
                        style={globalStyles.input}
                        multiline
                        placeholder='Review body'
                        onChangeText={props.handleChange('body')}
                        value={props.values.body}
                    />

                    <TextInput
                        style={globalStyles.input}
                        placeholder='Rating (1 - 5)'
                        onChangeText={props.handleChange('rating')}
                        value={props.values.rating}
                        keyboardType='numeric'
                    />

                    <TouchableOpacity onPressOut={() => { props.handleSubmit(); }}>
                        <Text style={styles.button}>Add Review</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'maroon',
        backgroundColor: 'maroon',
        color: 'white',
    },
});