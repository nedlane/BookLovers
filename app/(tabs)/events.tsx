import React, { useState, useEffect } from 'react';
import { View } from '../../components/Themed';
import { Event } from '../../components/CalendarEvent';
import { Agenda } from 'react-native-calendars';
import { globalStyles } from '../../constants/styles';
import { useRouter } from "expo-router";
import { getUser, userType } from './index';



export default function Events() {
    if ((!global.USER || !global.USER.username)) {
        getUser().then((user) => {
            global.USER = user;
        });
    }

    const router = useRouter();

    const [items, setItems] = useState({});
    const [loadedMonths, setLoadedMonths] = useState<string[]>([]);

    useEffect(() => {
        if (!global.USER.username || !global.USER.userid) {
            // alert("You are not logged in");
            router.push("/");
        };
        // Load initial events when the component mounts
        setLoadedMonths([]);
        loadItemsForMonth({ month: new Date().getMonth() - 1, year: new Date().getFullYear() });
        loadItemsForMonth({ month: new Date().getMonth(), year: new Date().getFullYear() });
        loadItemsForMonth({ month: new Date().getMonth() + 1, year: new Date().getFullYear() });

    }, [global.USER]);


    const loadItemsForMonth = async (DateData: { year: number, month: number, day?: number, timestamp?: number, dateString?: string }) => {
        if (!(global.USER || global.USER.userid)) return;
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

        var submit = { month: month, year: year, uid: global.USER.userid };

        var newevents = await fetch(global.SERVERPATH + '/mobile/listevents.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: Object.keys(submit)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent((submit as any)[key]))
                .join('&'),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data from the PHP server
                return data;
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error(error);
            });

        newevents = newevents.events

        var events = newevents.map((event: any) => {
            var meetingdatetime = event.meetingtime.split(" ");
            var meetingdate = meetingdatetime[0];
            var meetingtime = meetingdatetime[1];
            return { date: meetingdate, time: meetingtime, location: event.meetinglocation }
        })

        return events;


    };

    const formatEvents = ({ events, month, year }: { events: { time: string; date: string; location: string; }[], month: number, year: number }) => {
        const formattedEvents: {
            [date: string]: { time: string; date: string; location: string }[];
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
