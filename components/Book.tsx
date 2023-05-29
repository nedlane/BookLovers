import React, { useState } from "react";
import { Modal, Pressable, TouchableOpacity } from "react-native";
import { View, Text } from "./Themed";
import { globalStyles } from "../constants/styles";
import { Card } from "./Card";
import { BookImage } from "./BookImage";
import { ClubModal } from "./AddBookModal";

export const renderBook = ({ item, open, openModal, closeModal }: { item: any, open: boolean, openModal: VoidFunction, closeModal: VoidFunction }) => {
    let bookCover: JSX.Element | null = null;

    if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) { //&& item.volumeInfo.maturityRating === "NOT_MATURE"
        bookCover = (
            <BookImage
                lowResSrc={{ uri: item.volumeInfo.imageLinks.smallThumbnail }}
                highResSrc={{ uri: `https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w800-h1200&source=gbs_api` }}

            />
        );
    } else {
        bookCover = (
            <BookImage
                lowResSrc={{ uri: "https://books.google.com/books/publisher/content/images/frontcover/1?fife=w800-h1200&source=gbs_api" }}
                highResSrc={{ uri: "" }}
            />
        );
    }



    return (
        <TouchableOpacity style={{ alignSelf: "center", width: "90%", maxWidth: "400px" }} onPress={openModal}>
            {open && item.uuid !== "1" && <Modal
                transparent={true}
                visible={open}
                onRequestClose={closeModal}
                animationType="slide"
            >
                <ClubModal item={item} close={() => { closeModal(); }} />
            </Modal>}
            < Card innerStyle={{ flexDirection: "row" }
            }>
                {bookCover}
                < View style={[{ flexDirection: "column" }, globalStyles.flex_1]} >
                    <Text style={{ fontWeight: "bold" }}>{item.volumeInfo.title}</Text>
                    <Text style={{ fontStyle: "italic" }}>{item.volumeInfo.subtitle}</Text>
                    <Text style={{ fontWeight: "bold" }}>{item.volumeInfo.authors}</Text>
                </View >
            </Card >
        </TouchableOpacity >
    );
};