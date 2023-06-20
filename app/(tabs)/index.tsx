import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../../components/Themed';
import globalStyles from '../../constants/styles'
import { useAuth } from '../../contexts/authContext';
import { useRouter } from 'expo-router';


export default function HomePage() {
    const router = useRouter();

    const auth = useAuth();

    const { authData } = useAuth();

    const logOut = () => {
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
    flexLR: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

