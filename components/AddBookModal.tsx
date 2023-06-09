import React from 'react';
import { Pressable } from 'react-native';
import globalStyles from '../constants/styles';
import { useAuth } from '../contexts/authContext';
import { postRequest } from '../services/requests';
import { ClubsDropdown } from './ClubsDropdown';
import { Text, View } from './Themed';
import { getBookCover } from './Book';
import { Card } from './Card';

export function ClubModal(props: any) {

    let item = props.item

    const { authData } = useAuth();


    const handleSubmit = async (clubid: string) => {
        if (!authData) return;
        if (await postRequest('/mobile/vote.php', { userid: authData.userid, token: authData.token, clubid: clubid, bid: item.id })) props.close();
        return;
    }

    let bookCover: JSX.Element | null = getBookCover(item);

    return (
        <View style={[globalStyles.container]}>
            <Pressable onPress={(e) => { props.close(); e.stopPropagation }} style={[globalStyles.fill, { justifyContent: "center" }]}>
                <Card innerStyle={{ flexDirection: "row", alignSelf: "center" }}>
                    {bookCover}
                    <View style={[{ flexDirection: "column" }, globalStyles.flex_1]} >
                        <Text style={{ fontWeight: "bold" }}>{item.volumeInfo.title}</Text>
                        <Text style={{ fontStyle: "italic" }}>{item.volumeInfo.subtitle}</Text>
                        <Text style={{ fontWeight: "bold" }}>{item.volumeInfo.authors}</Text>
                    </View>
                </Card>
                {ClubsDropdown(handleSubmit, authData, "Add Book")}
            </Pressable>
        </View>
    );
}