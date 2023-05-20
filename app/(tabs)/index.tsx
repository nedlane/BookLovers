import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View, TextInput } from '../../components/Themed';
import { globalStyles } from '../../constants/styles';
import { Formik } from 'formik';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';


export default function Login() {

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

  return (
    <View style={[globalStyles.container]}>
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
            <View style={styles.flexLR}>
              <Text>Username:</Text>
              <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="e.g. s3119091" autoCorrect={false} onChangeText={props.handleChange('username')} value={props.values.username} />
            </View>
            <View style={styles.flexLR}>
              <Text>Password:</Text>
              <TextInput style={[globalStyles.input, styles.formwidth, globalStyles.flex_1]} placeholder="********" autoCorrect={false} secureTextEntry={true} onChangeText={props.handleChange('password')} value={props.values.password} />
            </View>
            <Button color='maroon' title="Submit" onPress={props.handleSubmit as any} />

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

