import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from './Themed';

export function Rating({ rating }: { rating: number }) {
    return (
        <View style={{ flexDirection: 'row' }} >
            {Array.from({ length: rating }).map((_, index) => (
                <FontAwesome key={index} name="star" size={16} color="gold" />
            ))}
        </View>
    );
};
