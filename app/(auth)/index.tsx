import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View, TextInput } from '../../components/Themed';
import globalStyles from '../../constants/styles'
import { Formik, FormikHelpers } from 'formik';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from '../../contexts/authContext';

export default function Login() {

    const [loading, isLoading] = useState(false);
    const auth = useAuth();
    const signIn = async (submit: { email: string, password: string }) => {
        isLoading(true);
        await auth.signIn(submit.email, submit.password);
    };

    const handleMediaQueryChange = (matches: boolean) => {
        if (matches) {
            styles.formwidth.width = '90%';
        } else {
            styles.formwidth.width = '50%';
        }
    }

    const SmallScreen: boolean = useMediaQuery(
        { maxWidth: 728 },
        undefined,
        handleMediaQueryChange
    );

    async function handleSubmit(values: { username: string, password: string }, actions: FormikHelpers<{ username: string, password: string }>) {
        const submit: { email: string, password: string } = { email: values.username.toLowerCase(), password: values.password };

        await signIn(submit);

        actions.resetForm();
        actions.setSubmitting(false);

    }




    return (
        <View style={[globalStyles.container]}>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={(values, actions) => {
                    if (values.username === "" || values.password === "") return;
                    handleSubmit(values, actions)
                }}
            >
                {props => (
                    <>
                        <View style={styles.flexLR}>
                            <Text>Email:</Text>
                            <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="e.g. s3119091" autoComplete="email" onChangeText={props.handleChange('username')} value={props.values.username} autoCapitalize='none' />
                        </View>
                        <View style={styles.flexLR}>
                            <Text>Password:</Text>
                            <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="********" autoCorrect={false} secureTextEntry={true} onChangeText={props.handleChange('password')} value={props.values.password} autoCapitalize='none' />
                        </View>
                        <Button color='maroon' title="Log In" onPress={props.handleSubmit as any} />
                    </>
                )}
            </Formik>
        </View>
    );
}



const styles = StyleSheet.create({
    formwidth: {
        width: '100%'
    },
    flexLR: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

