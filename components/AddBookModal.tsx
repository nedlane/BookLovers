import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View, TextInput } from './Themed';
import { globalStyles } from '../constants/styles';
import { Formik } from 'formik';
import { useAuth } from '../contexts/authContext';
import DropDownPicker from 'react-native-dropdown-picker';

export function BookModal() {

    const { authData } = useAuth();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function getClubs() {
            const submit = { userid: authData.userid, token: authData.token };
            console.log(submit);
            await fetch(global.SERVERPATH + '/mobile/myclubs.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: Object.keys(submit)
                    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent((submit as any)[key]))
                    .join('&'),
            })
                .then(response => response.json())
                .then(data => {
                    let clubs = data.clubs.map((club) => {
                        return { label: club.clubname, value: club.clubid };
                    });
                    console.log(clubs)
                    setItems(clubs);
                })
                .catch(error => {
                    // Handle any errors that occurred during the request
                    console.error(error);
                });

        }
        getClubs();
    }, [authData]);








    return (
        <Formik
            initialValues={{ clubid: '' }}
            onSubmit={(values, actions) => {
                return;
            }}
        >
            {props => (
                <View>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />



                    <TouchableOpacity onPressOut={() => { props.handleSubmit(); }}>
                        <Text style={styles.button}>Add Book</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
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