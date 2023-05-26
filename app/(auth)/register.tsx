import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View, TextInput } from '../../components/Themed';
import { globalStyles } from '../../constants/styles';
import { Formik, FormikHelpers } from 'formik';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from '../../contexts/authContext';



// SIGN UP IS NOT IMPLEMENTED YET




export default function Login() {

    const [loading, isLoading] = useState(false);
    const auth = useAuth();
    const signUp = async (submit: { email: string, password: string }) => {
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

        await signUp(submit);

        actions.resetForm();
        actions.setSubmitting(false);

    }




    return (
        <View style={[globalStyles.container]}>
            <Formik
                initialValues={{ username: '', password: '', passwordconf: '' }}
                onSubmit={(values, actions) => {
                    if (values.username === "" || values.password === "" || (values.password !== values.passwordconf)) return;
                    handleSubmit(values, actions)
                }}
            >
                {props => (
                    <>
                        <View style={styles.flexLR}>
                            <Text>Email:</Text>
                            <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="e.g. s3119091" autoCorrect={false} onChangeText={props.handleChange('username')} value={props.values.username} />
                        </View>
                        <View style={styles.flexLR}>
                            <Text>Password:</Text>
                            <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="********" autoCorrect={false} secureTextEntry={true} onChangeText={props.handleChange('password')} value={props.values.password} />
                        </View>
                        <View style={styles.flexLR}>
                            <Text>Retype Password:</Text>
                            <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="********" autoCorrect={false} secureTextEntry={true} onChangeText={props.handleChange('passwordconf')} value={props.values.passwordconf} />
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

