import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, } from 'react-native';
import { View, Text } from './Themed';
import DropDownPicker from 'react-native-dropdown-picker';
import { postRequest } from '../services/requests';
import globalStyles from '../constants/styles';


export function ClubsDropdown(handleSubmit: (clubid: string) => Promise<void>, authData: any, buttonValue: string = "Add Book") {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function getClubs() {
            if (!authData) return;
            const submit = { userid: authData.userid, token: authData.token };
            const data = await postRequest('/mobile/myclubs.php', submit)
            let clubs = data.clubs.map((club: any) => {
                return { label: club.clubname, value: club.clubid };
            });
            setItems(clubs);
            if (clubs.length > 0) {
                setValue(clubs[0].value);
            }
        }
        getClubs();
    }, [authData]);
    return (<>
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems as any} />
        <TouchableOpacity onPressOut={() => { handleSubmit(value); }}>
            <Text style={styles.button}>{buttonValue}</Text>
        </TouchableOpacity>
    </>);
}


const styles = StyleSheet.create({
    button: {
        margin: 10,
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        backgroundColor: 'maroon',
        color: 'white',
    },
});
