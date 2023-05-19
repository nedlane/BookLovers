import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View, TextInput } from '../../components/Themed';
import { globalStyles } from '../../constants/styles';
import { Formik } from 'formik';


export default function Login() {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, actions) => {
          if (values.username === "" || values.password === "") return;
          alert(JSON.stringify(values));
          actions.resetForm();

        }}
      >
        {props => (
          <>
            <View>
              <Text>Username:</Text>
              <TextInput style={globalStyles.input} placeholder="e.g. s3119091" autoCorrect={false} onChangeText={props.handleChange('username')} value={props.values.username} />
            </View>
            <View>
              <Text>Password:</Text>
              <TextInput style={globalStyles.input} placeholder="********" autoCorrect={false} secureTextEntry={true} onChangeText={props.handleChange('password')} value={props.values.password} />
            </View>
            <Button color='maroon' title="Submit" onPress={props.handleSubmit as any} />

          </>
        )}
      </Formik>
    </View>
  );
}


