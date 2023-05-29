import React from "react";
import { Keyboard, KeyboardAvoidingView, Pressable } from "react-native";
import { View } from "./Themed";
import { globalStyles } from "../constants/styles";

export function KeyboardDismiss({ children }: any) {
    return (
        <Pressable style={globalStyles.flex_1} onPressOut={() => {
            Keyboard.dismiss();
        }}>
            <View style={globalStyles.flex_1} >
                <KeyboardAvoidingView style={globalStyles.container}>
                    {children}
                </KeyboardAvoidingView>
            </View>
        </Pressable>
    );
}