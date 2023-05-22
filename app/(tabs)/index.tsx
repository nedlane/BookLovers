import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View, TextInput } from '../../components/Themed';
import { globalStyles } from '../../constants/styles';
import { Formik, FormikHelpers } from 'formik';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sha256 } from 'react-native-sha256';

export async function getUser() {
  const user = await AsyncStorage.getItem('BookLovers.user');
  return JSON.parse(user || '{}');
}

export type userType = {
  username: string,
  password: string,
};

export default function Login() {

  var user = getUser();

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
    var submit: { email: string, password: string } = { email: values.username.toLowerCase(), password: values.password };

    var newuser = await fetch(global.SERVERPATH + '/mobile/mobilelogin.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: Object.keys(submit)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent((submit as any)[key]))
        .join('&'),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data from the PHP server
        return data;
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });

    if (newuser.result === "Success") {

      await AsyncStorage.setItem('BookLovers.user', JSON.stringify(newuser));

      actions.resetForm();
      user = getUser();

    } else {
      alert("Invalid username or password");
    }
    actions.setSubmitting(false);

  }

  async function logOut() {
    await AsyncStorage.removeItem('BookLovers.user');
    user = getUser();
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
              <Text>Username:</Text>
              <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="e.g. s3119091" autoCorrect={false} onChangeText={props.handleChange('username')} value={props.values.username} />
            </View>
            <View style={styles.flexLR}>
              <Text>Password:</Text>
              <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="********" autoCorrect={false} secureTextEntry={true} onChangeText={props.handleChange('password')} value={props.values.password} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button color='maroon' title="Submit" onPress={props.handleSubmit as any} />
              <Button color='maroon' title="Reset" onPress={logOut as any} />
            </View>

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

