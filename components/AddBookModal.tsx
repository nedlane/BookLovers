import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { View } from './Themed';
import { globalStyles } from '../constants/styles';
import { useAuth } from '../contexts/authContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { postRequest } from '../services/postRequest';

export function ClubModal(props: any) {

    let item = props.item

    const { authData } = useAuth();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function getClubs() {
            const submit = { userid: authData.userid, token: authData.token };
            const data = await postRequest('/mobile/myclubs.php', submit)
            let clubs = data.clubs.map((club) => {
                return { label: club.clubname, value: club.clubid };
            });
            setItems(clubs);
        }
        getClubs();
    }, [authData]);

    const handleSubmit = async (clubid: string) => {
        if (await postRequest('/mobile/addbook.php', { userid: authData.userid, token: authData.token, clubid: clubid, bid: item.id })) props.close();
        return;
    }

    return (
        <Pressable style={globalStyles.fill} onPress={(e) => { props.close(); e.stopPropagation }}>
            <View style={globalStyles.container}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
                <TouchableOpacity onPressOut={() => { handleSubmit(value); }}>
                    <Text style={styles.button}>Add Book</Text>
                </TouchableOpacity>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'maroon',
        backgroundColor: 'maroon',
        color: 'white',
    },
});