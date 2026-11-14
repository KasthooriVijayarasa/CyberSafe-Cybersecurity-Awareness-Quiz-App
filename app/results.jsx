import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import topics from '../data/topics.json';
import { Colors } from '../constants/Colors';

const getAwarenessLevel = (percentage) => {
  if (percentage >= 80) {
    return 'Cyber Defender';
  }

  if (percentage >= 50) {
    return 'Security Learner';
  }

  return 'Cyber Beginner';
};

export default function Results() {
  // Values are passed from the Quiz page through Expo Router.
  const { score, total, topicId } = useLocalSearchParams();
  const correct = Number(score);
  const count = Number(total);
  const validResult = Number.isFinite(correct) && count > 0 && correct >= 0 && correct <= count;
  const percent = validResult ? Math.round((correct / count) * 100) : 0;
  const selectedTopicId = Array.isArray(topicId) ? topicId[0] : topicId;
  const topic = topics.find((item) => String(item.id) === String(selectedTopicId));

  if (!validResult) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.empty}>
          <Ionicons name="help-circle-outline" size={58} color={Colors.teal} />
          <Text style={styles.heading}>Ready to try the quiz?</Text>
          <Pressable style={styles.button} onPress={() => router.replace('/(tabs)/quiz')}>
            <Text style={styles.buttonText}>Start quiz</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const excellent = percent >= 80;
  const improving = percent >= 50;
  const message = excellent ? 'Excellent work!' : improving ? 'Nice progress!' : 'Keep practicing!';
  const detail = excellent
    ? 'You know your cyber safety basics. Keep those good habits going!'
    : improving
      ? 'You are learning the right things. Review a few topics and try again.'
      : 'Every question is practice. Read the lessons and give it another try.';

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <Pressable onPress={() => router.replace('/(tabs)')} style={styles.homeLink}>
            <Ionicons name="home-outline" size={20} color={Colors.text} />
            <Text style={styles.homeLinkText}>Home</Text>
          </Pressable>
          <Text style={styles.overline}>QUIZ COMPLETE</Text>
        </View>

        <View style={styles.celebration}>
          <View style={styles.circleOne} />
          <View style={styles.circleTwo} />
          <View style={styles.trophyCircle}>
            <Ionicons
              name={excellent ? 'trophy' : improving ? 'ribbon' : 'school'}
              size={46}
              color={Colors.orange}
            />
          </View>
          <Text style={styles.heading}>{message}</Text>

<View style={styles.awarenessBadge}>
  <Ionicons
    name="shield-checkmark-outline"
    size={18}
    color="#82E0D4"
  />
  <Text style={styles.awarenessText}>
    {getAwarenessLevel(percent)}
  </Text>
</View>

<Text style={styles.message}>{detail}</Text>
          {topic && <Text style={styles.lessonLabel}>{topic.title} • Topic quiz</Text>}
        </View>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>YOUR SCORE</Text>
          <Text style={styles.percentage}>{percent}<Text style={styles.percentSymbol}>%</Text></Text>
          <View style={styles.scoreBar}>
            <View style={[styles.scoreFill, { width: `${percent}%` }]} />
          </View>
          <Text style={styles.scoreCaption}>{correct} correct out of {count} questions</Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Ionicons name="checkmark-circle-outline" size={23} color={Colors.green} />
            <Text style={styles.summaryNumber}>{correct}</Text>
            <Text style={styles.summaryLabel}>Correct</Text>
          </View>
          <View style={styles.summaryCard}>
            <Ionicons name="close-circle-outline" size={23} color={Colors.red} />
            <Text style={styles.summaryNumber}>{count - correct}</Text>
            <Text style={styles.summaryLabel}>To review</Text>
          </View>
        </View>

        <View style={styles.tipBox}>
          <Ionicons name="bulb-outline" size={24} color="#B7822C" />
          <View style={{ flex: 1 }}>
            <Text style={styles.tipHeading}>Learning tip</Text>
            <Text style={styles.tipText}>Open a lesson, read the safety tips, then take its 3-question practice quiz.</Text>
          </View>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => router.replace({ pathname: '/(tabs)/quiz', params: { topicId: topic ? topic.id : '' } })}
        >
          <Text style={styles.buttonText}>Try again</Text>
          <Ionicons name="refresh" color={Colors.white} size={19} />
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => router.replace('/(tabs)/topics')}>
          <Text style={styles.secondaryText}>Explore learning topics</Text>
          <Ionicons name="arrow-forward" color={Colors.teal} size={19} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 36, width: '100%', maxWidth: 800, alignSelf: 'center' },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  homeLink: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 8 },
  homeLinkText: { color: Colors.text, fontWeight: '800', fontSize: 14 },
  overline: { color: Colors.teal, fontWeight: '900', fontSize: 10, letterSpacing: 1.2 },
  celebration: { backgroundColor: Colors.navy, borderRadius: 24, padding: 26, alignItems: 'center', overflow: 'hidden', marginBottom: 15 },
  circleOne: { position: 'absolute', width: 145, height: 145, borderRadius: 75, backgroundColor: '#213B5C', top: -65, right: -58 },
  circleTwo: { position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: '#20465A', bottom: -55, left: -45 },
  trophyCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#2A4260', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  heading: { color: Colors.white, fontSize: 27, fontWeight: '900', marginBottom: 9, textAlign: 'center' },
  message: { color: '#C8D8E9', fontSize: 13, lineHeight: 21, textAlign: 'center' },
  lessonLabel: { color: '#82E0D4', marginTop: 12, fontWeight: '800', fontSize: 12 },
  scoreCard: { backgroundColor: Colors.white, borderRadius: 22, alignItems: 'center', padding: 24, borderWidth: 1, borderColor: Colors.border, marginBottom: 13 },
  scoreLabel: { color: Colors.grey, fontSize: 10, letterSpacing: 1.2, fontWeight: '900' },
  percentage: { fontSize: 53, fontWeight: '900', color: Colors.navy, marginTop: 10 },
  percentSymbol: { fontSize: 25, color: Colors.teal },
  scoreBar: { height: 9, borderRadius: 7, backgroundColor: '#E5EBF3', overflow: 'hidden', width: '100%', marginTop: 5 },
  scoreFill: { backgroundColor: Colors.teal, height: '100%', borderRadius: 7 },
  scoreCaption: { color: Colors.grey, fontSize: 12, marginTop: 12 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  summaryCard: { flex: 1, backgroundColor: Colors.white, borderRadius: 18, padding: 17, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  summaryNumber: { fontSize: 24, fontWeight: '900', color: Colors.text, marginTop: 7 },
  summaryLabel: { color: Colors.grey, fontSize: 12 },
  tipBox: { backgroundColor: '#FFF3DA', borderRadius: 16, padding: 16, flexDirection: 'row', gap: 12, marginBottom: 18 },
  tipHeading: { color: '#82612C', fontWeight: '900', marginBottom: 5, fontSize: 13 },
  tipText: { color: '#8B724C', lineHeight: 19, fontSize: 12 },
  button: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 13, borderRadius: 16, padding: 17, backgroundColor: Colors.teal, marginBottom: 10 },
  buttonText: { color: Colors.white, fontWeight: '900', fontSize: 14 },
  secondaryButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, padding: 15 },
  secondaryText: { color: Colors.teal, fontWeight: '900', fontSize: 13 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 25 },
  awarenessBadge: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  backgroundColor: '#2A4260',
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 20,
  marginBottom: 12,
},

awarenessText: {
  color: '#82E0D4',
  fontSize: 14,
  fontWeight: '800',
},
});
