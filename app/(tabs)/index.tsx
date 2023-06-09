import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View, TextInput } from '../../components/Themed';
import globalStyles from '../../constants/styles'
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from '../../contexts/authContext';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();


  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const { authData } = useAuth();

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



  const logOut = () => {
    isLoading(true);
    auth.signOut();
    router.push('/(auth)');
  }


  return (
    <View style={[globalStyles.container]}>
      <Text style={globalStyles.title}>Welcome {authData?.firstname}</Text>

      <View style={styles.flexLR}>
        <Button color='maroon' title="Log Out" onPress={logOut as any} />
      </View>

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

