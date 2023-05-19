import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from './Themed';

export function Card(props: any) {
    return (
        <View style={[styles.card, props.style]}>
            <View style={[styles.cardContent, props.innerStyle]}>
                {props.children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        padding: 10,
        marginBottom: 10,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 20,
    }
});