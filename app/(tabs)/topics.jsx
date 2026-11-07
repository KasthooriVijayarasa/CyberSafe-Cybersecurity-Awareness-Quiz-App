import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import TopicCard from '../../components/TopicCard';
import topics from '../../data/topics.json';
import { Colors } from '../../constants/Colors';

const categories = ['All', 'Online Safety', 'Account Safety', 'Device Safety', 'Privacy'];

export default function Topics() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filtering is done using the local JSON dataset, not an internet API.
  const filteredTopics = topics.filter((item) => {
    const searchMatch = (item.title + ' ' + item.short).toLowerCase().includes(search.toLowerCase());
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    return searchMatch && categoryMatch;
  });

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <View>
            <Text style={styles.label}>CYBER KNOWLEDGE</Text>
            <Text style={styles.title}>Learn & explore</Text>
            <Text style={styles.subtitle}>Easy lessons for safer digital habits.</Text>
          </View>
          <View style={styles.bookIcon}>
            <Ionicons name="library-outline" size={25} color={Colors.teal} />
          </View>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={21} color={Colors.grey} />
          <TextInput
            style={styles.input}
            placeholder="Search cyber safety topics..."
            placeholderTextColor="#9BA8B7"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={19} color={Colors.grey} />
            </Pressable>
          )}
        </View>

        <View style={styles.chipsRow}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setSelectedCategory(item)}
                style={[styles.chip, selectedCategory === item && styles.chipActive]}
              >
                <Text style={[styles.chipText, selectedCategory === item && styles.chipTextActive]}>
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>

        <View style={styles.countRow}>
          <Text style={styles.countText}>{filteredTopics.length} topics found</Text>
          <Text style={styles.smallText}>Tap a card to learn</Text>
        </View>

        <FlatList
          data={filteredTopics}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TopicCard
              topic={item}
              onPress={() => router.push({ pathname: '/details', params: { id: String(item.id) } })}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 26, flexGrow: 1 }}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="search-outline" size={38} color={Colors.grey} />
              <Text style={styles.emptyTitle}>No topics found</Text>
              <Text style={styles.emptyText}>Try another search or category.</Text>
              <Pressable onPress={() => { setSearch(''); setSelectedCategory('All'); }}>
                <Text style={styles.clearText}>Clear filters</Text>
              </Pressable>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 18, width: '100%', maxWidth: 800, alignSelf: 'center' },
  heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 },
  label: { color: Colors.teal, fontSize: 10, letterSpacing: 1.4, fontWeight: '900', marginBottom: 7 },
  title: { color: Colors.text, fontSize: 28, fontWeight: '900' },
  subtitle: { color: Colors.grey, fontSize: 13, marginTop: 6 },
  bookIcon: { width: 54, height: 54, borderRadius: 18, backgroundColor: Colors.lightTeal, alignItems: 'center', justifyContent: 'center' },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, paddingHorizontal: 14, height: 53, borderRadius: 16, borderWidth: 1, borderColor: Colors.border, gap: 11, marginBottom: 16 },
  input: { flex: 1, color: Colors.text, fontSize: 14, paddingVertical: 10 },
  chipsRow: { height: 47, marginBottom: 13 },
  chip: { borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: Colors.white, marginRight: 8, borderWidth: 1, borderColor: Colors.border, alignSelf: 'flex-start' },
  chipActive: { backgroundColor: Colors.navy, borderColor: Colors.navy },
  chipText: { fontSize: 12, fontWeight: '800', color: Colors.grey },
  chipTextActive: { color: Colors.white },
  countRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  countText: { color: Colors.text, fontWeight: '800', fontSize: 13 },
  smallText: { color: Colors.grey, fontSize: 12 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 60, gap: 9 },
  emptyTitle: { color: Colors.text, fontSize: 18, fontWeight: '800', marginTop: 8 },
  emptyText: { color: Colors.grey, fontSize: 13 },
  clearText: { color: Colors.teal, fontWeight: '800', fontSize: 13, padding: 10 },
});
