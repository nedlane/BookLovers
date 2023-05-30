import { FlatList, Modal, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { ReviewDetails } from "./ReviewDetails";
import { Card } from "./Card";
import { globalStyles } from "../constants/styles";

export function ReviewList(reviews: { bid: string; title: string; rating: string; body: string; key: string; }[], openModal: (index: number) => void, modalStates: boolean[], closeModal: (index: number) => void) {
    return <FlatList style={globalStyles.flex_1} data={reviews} renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => {
            openModal(index);
        }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalStates[index]}
                onRequestClose={() => {
                    closeModal(index);
                }}
            >
                <View style={{ flex: 1 }}>
                    <ReviewDetails review={item} closeModal={() => { closeModal(index); }} index={index} />
                </View>
            </Modal>
            <Card>
                <Text style={globalStyles.title}>{item.title}</Text>
            </Card>
        </TouchableOpacity>
    )} />;
}