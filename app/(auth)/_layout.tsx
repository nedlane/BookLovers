import { FontAwesome, MaterialIcons } from '@expo/vector-icons/';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

const TabBarIconProps = {
  size: 28,
  style: { marginBottom: -3, minWidth: 28 }
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <FontAwesome {...TabBarIconProps} name="user-circle" color={color} />,

        }}
      />
    </Tabs>

  );
}
