import { StyleSheet, TextStyle } from 'react-native';

const inputColor = "#868788";

const input = {
    width: "100%",
    backgroundColor: inputColor,
    borderRadius: 25,
    height: 50,
    margin: 10,
    justifyContent: "center",
    padding: 20,
    fontSize: 18,
    color: "white",
    alignSelf: "center",
} as TextStyle;

const globalStyles = StyleSheet.create({
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
        borderColor: 'blue',
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
    input: input,
    inputMultiLine: {}
});

globalStyles.inputMultiLine = {
    ...input,
    height: input.height as number * 3,
};


export default globalStyles;
