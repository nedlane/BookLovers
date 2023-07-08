import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Card } from '../../components/Card';
import { View, Text } from '../../components/Themed';
import globalStyles from '../../constants/styles'
import { useAuth } from '../../contexts/authContext';
import { BookType, bookInner } from '../../components/Book';
import { MaterialIcons } from '@expo/vector-icons';
import { postRequest } from '../../services/requests';
import DropDownPicker from 'react-native-dropdown-picker';

function renderBook({ item, club, auth, setBook, index }: any) {

    item.myvote = parseInt(item.myvote);
    const authData = auth;

    const clickDown = () => {
        if (parseInt(item.id) === 1 && item.volumeInfo.title === "Loading..." && item.myvote === 0) return;
        if (item.myvote === -1) {
            updateVote(0);
        } else {
            updateVote(-1);
        }
    };

    const clickUp = async () => {
        if (parseInt(item.id) === 1 && item.volumeInfo.title === "Loading..." && item.myvote === 0) return;
        if (item.myvote === 1) {
            updateVote(0);
        } else {
            updateVote(1);
        }
    };

    const updateVote = async (vote: number) => {
        if (!authData) return;
        try {
            await postRequest('/mobile/vote.php', { clubid: club, bid: item.id, userid: authData.userid, token: authData.token, vote: vote })
            setBook(index, vote);
        } catch (e) {
            alert("Error");
        }
    };


    return (
        <Card>
            {bookInner(item, false)}
            <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 10 }}>
                <TouchableOpacity onPress={clickUp}>
                    {(item.myvote === 1) && <MaterialIcons name="thumb-up" size={24} color="blue" />}
                    {(item.myvote !== 1) && <MaterialIcons name="thumb-up" size={24} color="gray" />}
                </TouchableOpacity>
                <Text>{item.vote}</Text>
                <TouchableOpacity onPress={clickDown}>
                    {(item.myvote === -1) && <MaterialIcons name="thumb-down" size={24} color="blue" />}
                    {(item.myvote !== -1) && <MaterialIcons name="thumb-down" size={24} color="gray" />}
                </TouchableOpacity>
            </View>
        </Card >
    );
}

export default function VotePage() {

    const { authData } = useAuth();
    const [bookList, setBookList] = useState([] as BookType[]);

    useEffect(() => {
        setBookList([]);
    }, [authData]);

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

    useMemo(() => {
        const book = {
            id: "1",
            volumeInfo: { title: "Loading..." },
            myvote: 0
        };
        setBookList([book] as any);
        const getBooks = async (clubid: string) => {
            if (!authData) return;
            if (!clubid) return;
            const submit = { userid: authData.userid, token: authData.token, clubid: clubid };
            const data = await postRequest('/mobile/booklist.php', submit);
            setBookList(data.books);
        }
        getBooks(value);
    }, [value]);

    const setVote = (index: number, vote: any) => {
        setBookList((prev) => {
            let newBookList: any = [...prev];
            newBookList[index].vote = (parseInt(newBookList[index].vote) + (vote - parseInt(newBookList[index].myvote))).toString();
            newBookList[index].myvote = vote;
            return newBookList;
        });
    }

    return (
        <View style={[globalStyles.container, globalStyles.flex_1]}>
            {authData &&
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems as any} />
            }
            {/* {renderBook({ item: { volumeInfo: { title: "Add New Book" } }, open: false, openmodal: () => { }, closeModal: () => { } })} */}
            <FlatList
                data={bookList}
                renderItem={({ item, index }) => renderBook({ item: item, club: value, auth: authData, setBook: setVote, index: index })}
                keyExtractor={(item) => (item.id)}
                style={[globalStyles.fill, { marginTop: 10, width:"100%"}]}
            />
        </View>
    );
};




