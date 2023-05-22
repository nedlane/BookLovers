import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, Text } from '../../components/Themed';
import { globalStyles } from '../../constants/styles';
import { FlatList } from 'react-native';
import { Card } from '../../components/Card';
import { set } from 'react-hook-form';


export default function FindBook() {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);


    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        clearTimeout(searchTimeoutRef.current);

        if (search.trim() !== '') {
            searchTimeoutRef.current = setTimeout(() => {
                fetchBooks(page);
            }, 1000); // Set the desired rate limit in milliseconds 
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
            if (data.total_results === 0) {
                setBooks([]);
                return;
            }
            if (data.total_results < ((page - 1) * 25)) {
                setBooks((prevBooks) => [...prevBooks]);
            }

            data = data.results;

            if (currentPage === 1) {
                setBooks(data);
            } else {
                setBooks((prevBooks) => [...prevBooks, ...data]);
            }

        } catch (error) {
            console.error(error);
            setBooks([]);
        }
    };

    const fetchMoreBooks = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchBooks(nextPage);
    };


    const renderBook = ({ item }: { item: any }) => (
        <Card>
            <Text>{item.title}</Text>
            <Text>{item.authors}</Text>
            <Text>{item.canonical_isbn}</Text>
        </Card>
    );

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
                    keyExtractor={(item: any) => item.work_id}
                    onEndReachedThreshold={0.5}
                    onEndReached={fetchMoreBooks}
                />
            </View>
        </View>
    );
}
