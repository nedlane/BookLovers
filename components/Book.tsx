import React from "react";
import { Modal, StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { View, Text } from "./Themed";
import globalStyles from "../constants/styles";
import { Card } from "./Card";
import { BookImage } from "./BookImage";
import { ClubModal } from "./AddBookModal";

export type BookType = {
    id: string,
    uuid?: string,
    volumeInfo: {
        title: string,
        subtitle: string,
        authors: string[],
        imageLinks: {
            smallThumbnail: string,
            thumbnail: string
        }
    },
    vote?: number,
    myvote?: number
};

export const bookInner = (item: BookType, inner = true, style: StyleProp<ViewStyle> = {}) => {
    let bookCover: JSX.Element | null = getBookCover(item);
    if (!inner && Object.keys(style as Object).length === 0 && (style as Object).constructor === Object) {
        style = { alignSelf: "center", width: "90%", maxWidth: "300pt", flexDirection: "row" };
    }

    if (!item.volumeInfo.authors) item.volumeInfo.authors = ["Unknown Author"];
    if (typeof item.volumeInfo.authors === "string") item.volumeInfo.authors = [item.volumeInfo.authors];

    return (
        <View style={style}>
            {bookCover}
            < View style={[{ flexDirection: "column" }, globalStyles.flex_1]} >
                <Text style={{ fontWeight: "bold" }}>{item.volumeInfo.title}</Text>
                <Text>{item.volumeInfo.subtitle}</Text>
                <Text style={{ fontStyle: "italic" }}>{item.volumeInfo.authors.join(', ')}</Text>
            </View >
        </View>
    );
}


export const renderBook = ({ item, open, openModal, closeModal }: { item: BookType, open: boolean, openModal: VoidFunction, closeModal: VoidFunction }) => {

    return (
        <TouchableOpacity style={{ alignSelf: "center", width: "90%", maxWidth: "300pt" }} onPress={openModal}>
            {open && item.uuid !== "1" && <Modal
                transparent={true}
                visible={open}
                onRequestClose={closeModal}
                animationType="slide"
            >
                <ClubModal item={item} close={() => { closeModal(); }} />
            </Modal>}
            <Card>
                {bookInner(item, true, { flexDirection: "row" })}
            </Card>
        </TouchableOpacity>
    );
};

export function getBookCover(item: BookType) {
    let bookCover: JSX.Element | null = null;

    if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) { //&& item.volumeInfo.maturityRating === "NOT_MATURE"
        bookCover = (
            <BookImage
                lowResSrc={{ uri: item.volumeInfo.imageLinks.smallThumbnail }}
                highResSrc={{ uri: `https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w800-h1200&source=gbs_api` }} />
        );
    } else {
        bookCover = (
            <BookImage
                lowResSrc={{ uri: "https://books.google.com/books/publisher/content/images/frontcover/1?fife=w800-h1200&source=gbs_api" }}
                highResSrc={{ uri: "" }} />
        );
    }
    return bookCover;
}
