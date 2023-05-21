import React, { useState, useEffect } from 'react';
import { View } from '../../components/Themed';
import { Event } from '../../components/CalendarEvent';
import { Agenda } from 'react-native-calendars';
import { globalStyles } from '../../constants/styles';

export default function Events() {
    const [items, setItems] = useState({});
    const [loadedMonths, setLoadedMonths] = useState<string[]>([]);

    useEffect(() => {
        // Load initial events when the component mounts
        loadItemsForMonth({ month: new Date().getMonth() - 1, year: new Date().getFullYear() });
        loadItemsForMonth({ month: new Date().getMonth(), year: new Date().getFullYear() });
        loadItemsForMonth({ month: new Date().getMonth() + 1, year: new Date().getFullYear() });
    }, []);


    const loadItemsForMonth = async (DateData: { year: number, month: number, day?: number, timestamp?: number, dateString?: string }) => {
        const { month, year } = DateData;
        // Check if the month and year combo has already been loaded
        if (loadedMonths.includes(`${year}-${month.toString().padStart(2, '0')}`)) {
            return;
        }

        // Fetch events for the given month from your data source
        try {
            // Make an API call or fetch events from a database
            const fetchedEvents = await fetchEventsFromDataSource({ month, year });

            // Format the fetched events to match the required structure
            const formattedEvents = formatEvents({ events: fetchedEvents, month, year });

            // Update the items state with the fetched and formatted events
            setItems((prevItems) => ({
                ...prevItems,
                ...formattedEvents
            }));

            // Add the loaded month and year combo to the loadedMonths state
            setLoadedMonths((prevLoadedMonths) => [...prevLoadedMonths, `${year}-${month.toString().padStart(2, '0')}`]);
        } catch (error) {
            console.error('Error loading events:', error);
        }
    };


    const fetchEventsFromDataSource = async ({ month, year }: { month: number, year: number }) => {
        const dummyEvents = [
            { name: 'Event 1', date: `${year}-${month.toString().padStart(2, '0')}-10`, location: 'Location 1' },
            { name: 'Event 2', date: `${year}-${month.toString().padStart(2, '0')}-12`, location: 'Location 2' },
            { name: 'Event 3', date: `${year}-${month.toString().padStart(2, '0')}-15`, location: 'Location 3' },
        ];

        return dummyEvents;
    };

    const formatEvents = ({ events, month, year }: { events: { name: string; date: string; location: string; }[], month: number, year: number }) => {
        const formattedEvents: {
            [date: string]: { name: string; date: string; location: string }[];
        } = {};

        const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the month

        // Initialize formattedEvents with empty arrays for each day
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            formattedEvents[date] = [];
        }

        events.forEach((event) => {
            const date = event.date;
            if (formattedEvents[date]) {
                formattedEvents[date].push(event);
            } else {
                console.error('Invalid event date:', date);
            }
        });

        return formattedEvents;
    };


    return (
        <Agenda
            items={items}
            loadItemsForMonth={(DateData) => {
                loadItemsForMonth(DateData);
                if (DateData.month < 12) {
                    loadItemsForMonth({ month: DateData.month + 1, year: DateData.year });
                } else {
                    loadItemsForMonth({ month: 1, year: DateData.year + 1 });
                }
                if (DateData.month > 1) {
                    loadItemsForMonth({ month: DateData.month - 1, year: DateData.year });
                }
                else {
                    loadItemsForMonth({ month: 12, year: DateData.year - 1 });
                }


            }}
            renderItem={(item, firstItemInDay) => <Event event={item} />}
            renderEmptyDate={() => <View />}
        />
    );
}
