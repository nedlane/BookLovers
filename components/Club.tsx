import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';

type ClubType = {
    key: number,
    name: string,
    description: string,
    location: string,
};


export function Club({ club }: { club: ClubType }) {
    function handleClick() {
        alert(club.name);
    }

    return (
        <>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <TouchableOpacity onPress={handleClick}>
                <Text>Club Name: {club.name}</Text>
                <Text>Club Desc: {club.description}</Text>
                <Text>Location: {club.location}</Text>
            </TouchableOpacity>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </>
    );
};

const styles = StyleSheet.create({
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});