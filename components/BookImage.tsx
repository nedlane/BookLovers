import React, { useState } from 'react';
import { View, Image, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
import globalStyles from '../constants/styles';

interface BookImageProps {
    lowResSrc: ImageSourcePropType;
    highResSrc: ImageSourcePropType | undefined;
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
            ...globalStyles.flex_1,
            aspectRatio: 1 / 1.5,
            height: undefined,
            margin: '1%',
        },
        generalImage: {
            position: 'absolute',
            aspectRatio: 1 / 1.5,
            height: undefined,
            width: '100%',
            resizeMode: 'cover',
            // transitionProperty: 'opacity',
            // transitionDuration: '500ms',
            // transitionTimingFunction: 'ease-in'
        } as StyleProp<ImageStyle>,
        lowResImage: {
            opacity: isLoaded ? 0 : 1,
        } as StyleProp<ImageStyle>,
        highResImage: {
            opacity: isLoaded ? 1 : 0,
        } as StyleProp<ImageStyle>,
    };
    if (!highResSrc || highResSrc as string == '') {
        return (
            <View style={styles.wrapper}>
                <Image source={lowResSrc} style={[styles.lowResImage, styles.generalImage]} />
            </View>
        );
    }
    if (!lowResSrc || lowResSrc as string == '') {
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
