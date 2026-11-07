import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import topics from '../data/topics.json';
import questions from '../data/questions.json';
import { Colors } from '../constants/Colors';

export default function Details() {
  const { id } = useLocalSearchParams();
  const topicId = Array.isArray(id) ? id[0] : id;
  const topic = topics.find((item) => String(item.id) === String(topicId));

  if (!topic) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.notFound}>
          <Text style={styles.title}>Topic not found</Text>
          <Pressable onPress={() => router.replace('/(tabs)/topics')}>
            <Text style={styles.link}>Go to topics</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const topicNumber = topics.findIndex((item) => item.id === topic.id) + 1;
  const questionCount = questions.filter((item) => item.topicId === topic.id).length;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backRow} onPress={() => router.replace('/(tabs)/topics')}>
          <Ionicons name="arrow-back" size={21} color={Colors.text} />
          <Text style={styles.backText}>All topics</Text>
        </Pressable>

        <View style={[styles.hero, { backgroundColor: topic.color }]}>
          <View style={[styles.heroIcon, { backgroundColor: Colors.white }]}>
            <Ionicons name={topic.icon} size={37} color={topic.accent} />
          </View>
          <Text style={[styles.overline, { color: topic.accent }]}>LESSON {String(topicNumber).padStart(2, '0')} / {String(topics.length).padStart(2, '0')}</Text>
          <Text style={styles.title}>{topic.title}</Text>
          <Text style={styles.heroDescription}>{topic.short}</Text>
          <View style={styles.pill}>
            <Ionicons name="time-outline" size={14} color={topic.accent} />
            <Text style={[styles.pillText, { color: topic.accent }]}>3 minute read</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>What is it?</Text>
        <Text style={styles.paragraph}>{topic.description}</Text>

        <View style={styles.exampleBox}>
          <Ionicons name="chatbubble-ellipses-outline" color={Colors.purple} size={23} />
          <View style={styles.exampleTextBox}>
            <Text style={styles.exampleTitle}>REAL-LIFE EXAMPLE</Text>
            <Text style={styles.exampleText}>{topic.example}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Ionicons name="alert-circle-outline" color={Colors.red} size={23} />
          <Text style={styles.sectionTitleSmall}>Warning signs</Text>
        </View>
        {topic.warningSigns.map((point, index) => (
          <View style={styles.bulletRow} key={index}>
            <View style={[styles.dot, { backgroundColor: '#F2C5C6' }]} />
            <Text style={styles.bulletText}>{point}</Text>
          </View>
        ))}

        <View style={[styles.sectionHeader, { marginTop: 22 }]}>
          <Ionicons name="checkmark-circle-outline" color={Colors.green} size={23} />
          <Text style={styles.sectionTitleSmall}>How to stay safe</Text>
        </View>
        {topic.tips.map((point, index) => (
          <View style={styles.bulletRow} key={index}>
            <View style={[styles.checkIcon, { backgroundColor: Colors.lightTeal }]}>
              <Ionicons name="checkmark" size={15} color={Colors.green} />
            </View>
            <Text style={styles.bulletText}>{point}</Text>
          </View>
        ))}

        <View style={styles.rememberBox}>
          <Ionicons name="bulb" size={21} color="#B98128" />
          <View style={{ flex: 1 }}>
            <Text style={styles.rememberTitle}>REMEMBER</Text>
            <Text style={styles.rememberText}>{topic.remember}</Text>
          </View>
        </View>

        <Pressable
          style={styles.quizButton}
          onPress={() => router.push({ pathname: '/(tabs)/quiz', params: { topicId: topic.id } })}
        >
          <Text style={styles.quizButtonText}>Practice this topic ({questionCount} questions)</Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.white} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 35, paddingTop: 12, width: '100%', maxWidth: 800, alignSelf: 'center' },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 20, paddingVertical: 7, alignSelf: 'flex-start' },
  backText: { color: Colors.text, fontWeight: '800', fontSize: 14 },
  hero: { borderRadius: 25, padding: 23, marginBottom: 25 },
  heroIcon: { width: 69, height: 69, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 19 },
  overline: { fontSize: 10, fontWeight: '900', letterSpacing: 1.2, marginBottom: 10 },
  title: { color: Colors.text, fontSize: 28, fontWeight: '900', marginBottom: 8 },
  heroDescription: { color: '#4F6077', fontSize: 14, lineHeight: 22 },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 11, paddingVertical: 7, borderRadius: 14, alignSelf: 'flex-start', marginTop: 14 },
  pillText: { fontSize: 11, fontWeight: '800' },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: Colors.text, marginBottom: 9 },
  paragraph: { color: '#596A80', fontSize: 14, lineHeight: 24, marginBottom: 23 },
  exampleBox: { backgroundColor: '#F0EEFC', padding: 17, borderRadius: 17, flexDirection: 'row', gap: 12, marginBottom: 26 },
  exampleTextBox: { flex: 1 },
  exampleTitle: { fontSize: 10, letterSpacing: 1.1, color: Colors.purple, fontWeight: '900', marginBottom: 7 },
  exampleText: { color: '#495477', fontSize: 13, lineHeight: 21 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 12 },
  sectionTitleSmall: { fontSize: 18, fontWeight: '900', color: Colors.text },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 11, marginBottom: 12, paddingLeft: 3 },
  dot: { width: 9, height: 9, borderRadius: 5, marginTop: 7, marginRight: 7 },
  bulletText: { flex: 1, fontSize: 13, lineHeight: 21, color: '#5E6F84' },
  checkIcon: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  rememberBox: { flexDirection: 'row', gap: 12, borderRadius: 17, backgroundColor: '#FFF1D5', padding: 16, marginTop: 20, marginBottom: 22 },
  rememberTitle: { fontSize: 10, letterSpacing: 1, color: '#B98128', fontWeight: '900', marginBottom: 5 },
  rememberText: { fontSize: 13, lineHeight: 20, color: '#80643F', fontWeight: '700' },
  quizButton: { backgroundColor: Colors.teal, borderRadius: 17, padding: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  quizButtonText: { fontSize: 14, color: Colors.white, fontWeight: '900', flex: 1 },
  link: { color: Colors.teal, fontSize: 14, marginTop: 10 },
  notFound: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
