import React, { useMemo, useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../../components/Themed';
import globalStyles from '../../constants/styles'
import { useAuth } from '../../contexts/authContext';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';


export default function HomePage() {
    const router = useRouter();


    const auth = useAuth();
    const { authData } = useAuth();


    const logOut = () => {
        auth.signOut();
        router.push('/(auth)');
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([] as any);
    useMemo(() => {
            const options = ['Calendar View', 'List View'];
            setItems(options.map((item: string, index: number) => ({ label: item, value: index })));
            }, [authData]);
    return (
            <View style={[globalStyles.container]}>
            <Text style={globalStyles.title}>Welcome {authData?.firstname}</Text>
            <View style={styles.flexLR}>
            <Button color='maroon' title="Log Out" onPress={logOut as any} />
            </View>
            <DropDownPicker open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems as any} />
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

