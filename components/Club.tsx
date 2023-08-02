import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import { Card } from './Card';

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
        <Card>
            <TouchableOpacity onPress={handleClick}>
                <Text>Club Name: {club.name}</Text>
                <Text>Club Desc: {club.description}</Text>
                <Text>Location: {club.location}</Text>
            </TouchableOpacity>
        </Card>
    );
};

