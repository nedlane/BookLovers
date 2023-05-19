import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View, TextInput } from '../../components/Themed';
import { Formik } from 'formik';


export default function Login() {
  return (
    <View style={styles.container}>
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
              <TextInput style={styles.input} placeholder="e.g. s3119091" autoCorrect={false} onChangeText={props.handleChange('username')} value={props.values.username} />
            </View>
            <View>
              <Text>Password:</Text>
              <TextInput style={styles.input} placeholder="********" autoCorrect={false} secureTextEntry={true} onChangeText={props.handleChange('password')} value={props.values.password} />
            </View>
            <Button color='maroon' title="Submit" onPress={props.handleSubmit as any} />

          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
  },
});
