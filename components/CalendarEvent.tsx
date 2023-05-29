import React from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from './Themed';
import { Card } from './Card';
import { globalStyles } from '../constants/styles';
import { ReviewPage } from './ReviewPage';

export function Event(props: any) {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        openModal();
    }

    const closeModal = () => {
        setOpen(false);
    };

    const openModal = () => {
        setOpen(true);
    };


    return (
        <TouchableOpacity onPress={handleClick}>
            <Modal
                transparent={true}
                visible={open}
                onRequestClose={closeModal}
                animationType="slide">
                <View style={globalStyles.fill}>
                    <ReviewPage close={closeModal} meetingid={props.event.meetingid} />
                </View>
            </Modal>
            <Card style={props.style}>
                <Text>{props.event.time.substring(0, props.event.time.length - 3)} - {props.event.location}</Text>
            </Card>
        </TouchableOpacity>

    );
}
