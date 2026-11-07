import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.teal,
      tabBarInactiveTintColor: Colors.grey,
      tabBarStyle: {
        backgroundColor: Colors.white,
        borderTopColor: Colors.border,
        height: 68,
        paddingTop: 6,
        paddingBottom: 9,
      },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
      }} />
      <Tabs.Screen name="topics" options={{
        title: 'Topics',
        tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />,
      }} />
      <Tabs.Screen name="quiz" options={{
        title: 'Quiz',
        tabBarIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />,
      }} />
    </Tabs>
  );
}
