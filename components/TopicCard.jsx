import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

// One reusable topic card. It is used on Home and Topics.
export default function TopicCard({ topic, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: topic.color }]}>
        <Ionicons name={topic.icon} size={27} color={topic.accent} />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.category}>{topic.category.toUpperCase()}</Text>
        <Text style={styles.title}>{topic.title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>{topic.short}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 12,
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  textBox: { flex: 1, paddingRight: 5 },
  category: {
    fontSize: 9,
    color: Colors.teal,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: { fontSize: 15, color: Colors.text, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 12, color: Colors.grey, lineHeight: 18 },
});
