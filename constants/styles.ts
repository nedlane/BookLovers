import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
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
    input: {
        borderWidth: 1,
        borderColor: '#777',
        margin: 10,
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    flex_1: {
        flex: 1,
        width: '100%',
    },
    fill: {
        flex: 1,
        margin: 0,
        padding: 0,
    },
    debug: {
        borderWidth: 10,
        borderColor: 'black',
        backgroundColor: 'red',
    },
    modal: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.5)',
        width: '100%',
        height: '100%',
    },
});

