import React, { useState } from 'react';
import { View, Image, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
import { globalStyles } from '../constants/styles';

interface BookImageProps {
    lowResSrc: ImageSourcePropType;
    highResSrc: ImageSourcePropType;
}

export const BookImage: React.FC<BookImageProps> = ({
    highResSrc,
    lowResSrc,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    //set is loaded to true after 1 second
    const handleImageOnLoad = () => setIsLoaded(true);
    const styles = {
        wrapper: {
            aspectRatio: 1 / 1.5,
            height: undefined,
            margin: '1%',
            ...globalStyles.flex_1,
        },
        generalImage: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            transitionProperty: 'opacity',
            transitionDuration: '500ms',
        } as StyleProp<ImageStyle>,
        lowResImage: {
            opacity: isLoaded ? 0 : 1,
            transitionTimingFunction: 'ease-in',
        } as StyleProp<ImageStyle>,
        highResImage: {
            opacity: isLoaded ? 1 : 0,
            transitionTimingFunction: 'ease-in',
        } as StyleProp<ImageStyle>,
    };
    if (!highResSrc || highResSrc === '') {
        return (
            <View style={styles.wrapper}>
                <Image source={lowResSrc} style={[styles.lowResImage, styles.generalImage]} />
            </View>
        );
    }
    if (!lowResSrc || lowResSrc === '') {
        return (
            <View style={styles.wrapper}>
                <Image source={highResSrc} style={[styles.highResImage, styles.generalImage]} />
            </View>
        );
    }
    return (
        <View style={styles.wrapper}>
            <Image source={lowResSrc} style={[styles.lowResImage, styles.generalImage]} />
            <Image
                source={highResSrc}
                style={[styles.highResImage, styles.generalImage]}
                onLoad={handleImageOnLoad}
            />
        </View>
    );
};
