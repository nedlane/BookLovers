import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View, TextInput } from './Themed';
import { globalStyles } from '../constants/styles';
import { Formik } from 'formik';

export function ReviewForm({ addReview }: { addReview: Function }) {

    return (

        <View style={globalStyles.container}>
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
                            placeholder='Review details'
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

                        <Button color='maroon' title="Submit" onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
        </View>

    );
}