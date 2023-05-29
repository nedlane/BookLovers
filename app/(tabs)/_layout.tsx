import { FontAwesome, MaterialIcons } from '@expo/vector-icons/';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import { useAuth } from '../../contexts/authContext';


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

const TabBarIconProps = {
  size: 28,
  style: { marginBottom: -3, minWidth: 28 }
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { authData } = useAuth();
  if (!authData) return;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Account',
          tabBarIcon: ({ color }) => <FontAwesome {...TabBarIconProps} name="user-circle" color={color} />,

        }}
      />
      <Tabs.Screen
        name="myclubs"
        options={{
          title: 'My Clubs',
          tabBarIcon: ({ color }) => <FontAwesome {...TabBarIconProps} name="wpexplorer" color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'My Events',
          tabBarIcon: ({ color }) => <MaterialIcons {...TabBarIconProps} name="event" color={color} />
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          title: 'Get Books',
          tabBarIcon: ({ color }) => <FontAwesome {...TabBarIconProps} name="book" color={color} />
        }}
      />
    </Tabs >


  );
}
