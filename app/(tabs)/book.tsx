import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, Text } from '../../components/Themed';
import { globalStyles } from '../../constants/styles';
import { FlatList } from 'react-native';
import { Card } from '../../components/Card';
import { v4 } from 'uuid';
import { BookImage } from '../../components/BookImage';


export default function FindBook() {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);


    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        clearTimeout(searchTimeoutRef.current);

        if (search.trim() !== '') {
            fetchBooks(page);
        } else {
            setBooks([]);
        }

        return () => {
            clearTimeout(searchTimeoutRef.current);
        };
    }, [search]);

    const handleChange = (newSearch: string) => {
        setPage(1);
        setSearch(newSearch);
    };


    const fetchBooks = async (currentPage: number) => {
        const submit = { book: search, page: currentPage };
        if (currentPage === 1) {
            const book = {
                uuid: "1",
                volumeInfo: { title: "Loading..." }
            }
            setBooks([book]);
        }
        searchTimeoutRef.current = setTimeout(async () => {
            try {
                const response = await fetch(global.SERVERPATH + '/mobile/findbook.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: Object.keys(submit)
                        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent((submit as any)[key]))
                        .join('&'),
                });

                if (!response.ok) {
                    throw new Error('Request failed with status ' + response.status);
                }

                var data = await response.json();


                if (data.totalItems === 0) {
                    const book = {
                        uuid: "2",
                        volumeInfo: { title: "No Results" }
                    }
                    setBooks([book]);
                    return;
                }
                if (data.totalItems < ((page - 1) * 25)) {
                    setBooks((prevBooks) => [...prevBooks]);
                    return;
                }

                data = data.items;

                data = data.map((book: any) => ({ uuid: v4(), ...book }));

                if (currentPage === 1) {
                    setBooks(data);
                    return;
                } else {
                    setBooks((prevBooks) => [...prevBooks, ...data]);
                    return;
                }

                throw new Error("How the hell did the code get to here");

            } catch (error) {
                console.error(error);
                const book = {
                    uuid: "3",
                    volumeInfo: { title: "Error" }
                }
                setBooks([book]);
            }
        }, 500);
    };

    const fetchMoreBooks = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchBooks(nextPage);
    };


    const renderBook = ({ item }: { item: any }) => {
        let bookCover: JSX.Element | null = null;
        if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
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
            <Card innerStyle={{ flexDirection: "row" }}>
                <View style={[{ flexDirection: "column" }, globalStyles.flex_1]}>
                    <Text style={{ fontWeight: "bold" }}>{item.volumeInfo.title}</Text>
                    <Text style={{ fontStyle: "italic" }}>{item.volumeInfo.subtitle}</Text>
                    <Text style={{ fontWeight: "bold" }}>{item.volumeInfo.authors}</Text>
                </View>
                {bookCover}
            </Card>
        );
    };

    return (
        <View style={globalStyles.container}>
            <TextInput
                style={globalStyles.input}
                placeholder="Book Title"
                onChangeText={handleChange}
                value={search}
            />
            <View style={globalStyles.flex_1}>
                <FlatList
                    data={books}
                    style={{ flex: 1 }}
                    renderItem={renderBook}
                    keyExtractor={(item: any) => (item.uuid)}
                    onEndReachedThreshold={2}
                    onEndReached={fetchMoreBooks}
                />
            </View>
        </View>
    );
}
