import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { View } from '../../components/Themed';
import { Club } from '../../components/Club';
import { globalStyles } from '../../constants/styles';
import { getUser, userType } from './index';


export default function MyClubs() {
    const [clubs, setClubs] = useState([] as any);

    useEffect(() => {
        async function fetchData() {
            const user = await getUser();
            const clubsData = await getClubs(user);
            setClubs(clubsData);
        }
        fetchData();
    }, []);

    async function getClubs(user: userType) {
        if (!user.username) return [];
        return [
            { key: 1, name: 'Club 1', description: 'This is a club', location: 'This is a location #1' },
            { key: 2, name: 'Club 2', description: 'This is a club but 2', location: 'This is a location' },
            { key: 3, name: 'Club 3', description: 'This is a club but 3', location: 'This is a location but #3' },
        ];
    }



    return (
        <View style={globalStyles.container}>
            <FlatList
                data={clubs}
                style={{ flex: 1 }}
                renderItem={({ item }) => (
                    <Club club={item} />
                )}
            />
        </View>
    );
};

