import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import TopicCard from '../../components/TopicCard';
import topics from '../../data/topics.json';
import questions from '../../data/questions.json';
import { Colors } from '../../constants/Colors';

export default function Home() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.brandIcon}>
              <Ionicons name="shield-checkmark" size={21} color={Colors.white} />
            </View>
            <View>
              <Text style={styles.brandName}>CyberSafe</Text>
              <Text style={styles.brandSubtitle}>LEARN • PRACTICE • PROTECT</Text>
            </View>
          </View>
          <View style={styles.headerStar}>
            <Ionicons name="sparkles" color={Colors.orange} size={21} />
          </View>
        </View>

        <View style={styles.hero}>
          {/* Simple decorative circles made with View components. */}
          <View style={styles.heroCircleOne} />
          <View style={styles.heroCircleTwo} />
          <View style={styles.heroBadge}>
            <Ionicons name="ellipse" size={8} color="#6AEDD8" />
            <Text style={styles.heroBadgeText}>YOUR OFFLINE SAFETY GUIDE</Text>
          </View>
          <Text style={styles.heroTitle}>Stay smart.{'\n'}Stay secure.</Text>
          <Text style={styles.heroText}>
            Learn simple cyber safety tips and test what you know—anytime, anywhere.
          </Text>
          <Pressable style={styles.heroButton} onPress={() => router.push('/(tabs)/quiz')}>
            <Text style={styles.heroButtonText}>Start quick quiz</Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.navy} />
          </Pressable>
          <View style={styles.heroShield}>
            <Ionicons name="shield-checkmark" color="#A6DBDB" size={65} />
          </View>
        </View>

        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#E1F6F1' }]}>
              <Ionicons name="book-outline" size={18} color={Colors.teal} />
            </View>
            <Text style={styles.statNumber}>{topics.length}</Text>
            <Text style={styles.statLabel}>Learning topics</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#F1ECFF' }]}>
              <Ionicons name="help-circle-outline" size={18} color={Colors.purple} />
            </View>
            <Text style={styles.statNumber}>{questions.length}</Text>
            <Text style={styles.statLabel}>Practice questions</Text>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>Explore topics</Text>
            <Text style={styles.sectionCaption}>Start with the basics</Text>
          </View>
          <Pressable onPress={() => router.push('/(tabs)/topics')} style={styles.seeAll}>
            <Text style={styles.seeAllText}>See all</Text>
            <Ionicons name="arrow-forward" size={15} color={Colors.teal} />
          </Pressable>
        </View>
        {topics.slice(0, 3).map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            onPress={() => router.push({ pathname: '/details', params: { id: String(topic.id) } })}
          />
        ))}

        <View style={styles.tipBox}>
          <Ionicons name="bulb-outline" size={25} color="#D28D31" />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Safety reminder</Text>
            <Text style={styles.tipText}>Never share your password or one-time login code, even with someone who claims to be IT support.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 28, width: '100%', maxWidth: 800, alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  brand: { flexDirection: 'row', alignItems: 'center' },
  brandIcon: { width: 43, height: 43, borderRadius: 14, backgroundColor: Colors.navy, alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  brandName: { fontSize: 20, fontWeight: '900', color: Colors.navy },
  brandSubtitle: { fontSize: 9, fontWeight: '800', color: Colors.grey, letterSpacing: 0.8, marginTop: 3 },
  headerStar: { height: 43, width: 43, backgroundColor: Colors.white, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  hero: { backgroundColor: Colors.navy, borderRadius: 27, padding: 23, overflow: 'hidden', minHeight: 295, justifyContent: 'space-between', marginBottom: 16 },
  heroCircleOne: { position: 'absolute', width: 210, height: 210, borderRadius: 105, right: -82, top: -75, backgroundColor: '#1B3B5A' },
  heroCircleTwo: { position: 'absolute', width: 140, height: 140, borderRadius: 70, right: -50, bottom: -60, backgroundColor: '#20485B' },
  heroBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#24435A', alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, gap: 7 },
  heroBadgeText: { color: '#BCEAE5', fontWeight: '800', fontSize: 9, letterSpacing: 0.8 },
  heroTitle: { fontSize: 34, lineHeight: 40, letterSpacing: -1, fontWeight: '900', color: Colors.white, marginTop: 17 },
  heroText: { fontSize: 13, lineHeight: 21, color: '#C7D8E7', maxWidth: '80%', marginTop: 8, marginBottom: 21 },
  heroButton: { backgroundColor: Colors.orange, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 17, paddingVertical: 13, borderRadius: 13, gap: 13 },
  heroButtonText: { fontWeight: '800', color: Colors.navy, fontSize: 13 },
  heroShield: { position: 'absolute', right: 22, bottom: 27, transform: [{ rotate: '-14deg' }], opacity: 0.63 },
  statRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  statCard: { flex: 1, backgroundColor: Colors.white, borderRadius: 20, padding: 17, borderWidth: 1, borderColor: Colors.border },
  statIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 11 },
  statNumber: { fontSize: 24, color: Colors.text, fontWeight: '900' },
  statLabel: { fontSize: 12, color: Colors.grey, marginTop: 3 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 },
  sectionTitle: { fontSize: 21, fontWeight: '900', color: Colors.text },
  sectionCaption: { color: Colors.grey, fontSize: 12, marginTop: 3 },
  seeAll: { flexDirection: 'row', alignItems: 'center', gap: 5, padding: 8 },
  seeAllText: { color: Colors.teal, fontSize: 12, fontWeight: '800' },
  tipBox: { backgroundColor: '#FFF4DC', borderRadius: 19, padding: 17, flexDirection: 'row', gap: 13, marginTop: 9 },
  tipContent: { flex: 1 },
  tipTitle: { color: Colors.navy, fontWeight: '800', fontSize: 14, marginBottom: 5 },
  tipText: { color: '#816B4C', fontSize: 12, lineHeight: 19 },
});
