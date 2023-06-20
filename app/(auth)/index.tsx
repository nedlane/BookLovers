import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { View, TextInput } from '../../components/Themed';
import globalStyles from '../../constants/styles'
import { Formik, FormikHelpers } from 'formik';
import '@expo/match-media';
import { useAuth } from '../../contexts/authContext';

export default function Login() {

    const auth = useAuth();

    async function handleSubmit(values: { username: string, password: string }, actions: FormikHelpers<{ username: string, password: string }>) {

        if (await auth.signIn(values.username, values.password)) {
            actions.resetForm();
            actions.setSubmitting(false);
        }

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
                            <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="Email: steve@jobs.com" autoComplete="email" onChangeText={props.handleChange('username')} value={props.values.username} autoCapitalize='none' />
                        </View>
                        <View style={styles.flexLR}>
                            <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="Password: ********" autoCorrect={false} secureTextEntry={true} onChangeText={props.handleChange('password')} value={props.values.password} autoCapitalize='none' />
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

