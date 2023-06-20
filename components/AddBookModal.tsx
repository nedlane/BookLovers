import React from 'react';
import { Pressable } from 'react-native';
import globalStyles from '../constants/styles';
import { useAuth } from '../contexts/authContext';
import { postRequest } from '../services/requests';
import { ClubsDropdown } from './ClubsDropdown';
import { View } from './Themed';
import { bookInner} from './Book';
import { Card } from './Card';

export function ClubModal(props: any) {

    let item = props.item

    const { authData } = useAuth();


    const handleSubmit = async (clubid: string) => {
        if (!authData) return;
        if (await postRequest('/mobile/vote.php', { userid: authData.userid, token: authData.token, clubid: clubid, bid: item.id })) props.close();
        return;
    }


    return (
        <View style={[globalStyles.container]}>
            <Pressable onPress={(e) => { props.close(); e.stopPropagation }} style={[globalStyles.fill, { justifyContent: "center" }]}>
                <Card>
                    {bookInner(item, true, { flexDirection: "row" })}
                </Card>
                {ClubsDropdown(handleSubmit, authData, "Add Book")}
            </Pressable>
        </View>
    );
}
