import React, { useState, useEffect } from 'react';
import { View } from '../../components/Themed';
import { Event } from '../../components/CalendarEvent';
import { Agenda } from 'react-native-calendars';
import { useAuth } from '../../contexts/authContext';
import { postRequest } from '../../services/requests';


export default function Events() {
    const { authData } = useAuth();

    const [items, setItems] = useState({});
    const [loadedMonths, setLoadedMonths] = useState<string[]>([]);

    useEffect(() => {
        // Load initial events when the component mounts
        setLoadedMonths([]);
        loadItemsForMonth({ month: new Date().getMonth() - 1, year: new Date().getFullYear() });
        loadItemsForMonth({ month: new Date().getMonth(), year: new Date().getFullYear() });
        loadItemsForMonth({ month: new Date().getMonth() + 1, year: new Date().getFullYear() });

    }, [authData]);


    const loadItemsForMonth = async (DateData: { year: number, month: number, day?: number, timestamp?: number, dateString?: string }) => {
        const { month, year } = DateData;
        if (!month) return;
        if (!year) return;
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
        if (authData == null) return;

        const submit = { month: month, year: year, uid: authData.userid, token: authData.token };

        let newevents = await postRequest('/mobile/listevents.php', submit);

        newevents = newevents.events

        const events = newevents.map((event: any) => {
            const meetingdatetime = event.meetingtime.split(" ");
            const meetingdate = meetingdatetime[0];
            const meetingtime = meetingdatetime[1];
            const meetingid = event.meetingid;
            const book = event.book;
            return { date: meetingdate, time: meetingtime, location: event.meetinglocation, meetingid: meetingid, book: book }
        })

        return events;


    };

    const formatEvents = ({ events, month, year }: { events: { time: string; date: string; location: string; meetingid: string }[], month: number, year: number }) => {
        const formattedEvents: {
            [date: string]: { time: string; date: string; location: string; meetingid: string; }[];
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
            renderItem={(item) => <Event event={item} />}
            renderEmptyDate={() => <View />}
        />
    );
}
