import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Club } from '../../components/Club';

var clubs = [
    { "key": 1, "name": "Club 1", "description": "This is a club", "location": "This is a location #1", },
    { "key": 2, "name": "Club 2", "description": "This is a club but 2", "location": "This is a location", },
    { "key": 3, "name": "Club 3", "description": "This is a club but 3", "location": "This is a location but #3", },
];

export default function myclubs() {
    return (
        <View style={styles.container}>

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});