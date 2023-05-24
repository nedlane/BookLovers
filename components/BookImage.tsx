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
    console.log(highResSrc);

    //set is loaded to true after 1 second
    const handleImageOnLoad = () => setIsLoaded(true);
    const styles = {
        wrapper: {
            aspectRatio: 1 / 1.5,
            height: undefined,
            margin: '1%',
            ...globalStyles.flex_1,
        },
        lowResImage: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            opacity: isLoaded ? 0 : 1,
            transitionProperty: 'opacity',
            transitionDuration: '500ms',
            transitionTimingFunction: 'ease-in',
        } as StyleProp<ImageStyle>,
        highResImage: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            opacity: isLoaded ? 1 : 0,
            transitionProperty: 'opacity',
            transitionDuration: '500ms',
            transitionTimingFunction: 'ease-in',
        } as StyleProp<ImageStyle>,
    };

    return (
        <View style={styles.wrapper}>
            <Image source={lowResSrc} style={styles.lowResImage} />
            <Image
                source={highResSrc}
                style={styles.highResImage}
                onLoad={handleImageOnLoad}
            />
        </View>
    );
};
