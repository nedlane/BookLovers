import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View, TextInput } from '../../components/Themed';
import globalStyles from '../../constants/styles'
import { Formik, FormikHelpers } from 'formik';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from '../../contexts/authContext';



// SIGN UP IS NOT IMPLEMENTED YET




export default function Login() {

    const [loading, isLoading] = useState(false);
    const auth = useAuth();
    const signUp = async (submit: any) => {
        isLoading(true);
        await auth.signUp(submit);
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

    async function handleSubmit(values: any, actions: any) {
        const submit: { email: string, password: string, fname: string, sname: string, pcode: string } = { email: values.username.toLowerCase(), password: values.password, fname: values.fname, sname: values.sname, pcode: values.pcode };
        await signUp(submit);

        actions.resetForm();
        actions.setSubmitting(false);

    }




    return (
        <View style={[globalStyles.container]}>
            <Formik
                initialValues={{ username: '', password: '', passwordconf: '', fname: '', sname: '', pcode: '' }}
                onSubmit={(values, actions) => {
                    if (values.username === "" || values.password === "" || (values.password !== values.passwordconf) || values.fname === "" || values.sname === "") return;
                    handleSubmit(values, actions)
                }}
            >
                {props => (
                    <>
                        <View style={styles.flexLR}>
                            {/* <Text>Email:</Text> */}
                            <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="Email: steve@jobs.com" autoCorrect={false} onChangeText={props.handleChange('username')} value={props.values.username} />
                        </View>
                        <View style={styles.flexLR}>
                            {/* <Text>First Name:</Text> */}
                            <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="First Name: Brad" onChangeText={props.handleChange('fname')} value={props.values.fname} />
                        </View>
                        <View style={styles.flexLR}>
                            {/* <Text>Surname:</Text> */}
                            <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="Surname: Nielsen" onChangeText={props.handleChange('sname')} value={props.values.sname} />
                        </View>
                        <View style={styles.flexLR}>
                            {/* <Text>Post Code:</Text> */}
                            <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="Postcode: 4000" onChangeText={props.handleChange('pcode')} value={props.values.pcode} keyboardType='numeric' />
                        </View>
                        <View style={styles.flexLR}>
                            {/* <Text>Password:</Text> */}
                            <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="Password: ********" autoCorrect={false} secureTextEntry={true} onChangeText={props.handleChange('password')} value={props.values.password} />
                        </View>
                        <View style={styles.flexLR}>
                            {/* <Text>Retype Password:</Text> */}
                            <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="Retype password:" autoCorrect={false} secureTextEntry={true} onChangeText={props.handleChange('passwordconf')} value={props.values.passwordconf} />
                        </View>
                        <Button color='maroon' title="Register" onPress={props.handleSubmit as any} />
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

