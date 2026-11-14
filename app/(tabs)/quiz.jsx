import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import questions from '../../data/questions.json';
import topics from '../../data/topics.json';
import { Colors } from '../../constants/Colors';

export default function Quiz() {
  const { topicId } = useLocalSearchParams();
  const selectedTopicId = Array.isArray(topicId) ? topicId[0] : topicId;
  const topic = topics.find((item) => String(item.id) === String(selectedTopicId));

  // The main quiz uses 12 questions spread across all 8 topics.
  // A quiz started from a lesson uses its 3 related questions.
  const quizQuestions = topic
    ? questions.filter((item) => item.topicId === topic.id)
    : questions.filter((item, index) => index % 2 === 0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  // Start from question 1 whenever this tab is opened again.
  useFocusEffect(
    useCallback(() => {
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setScore(0);
    }, [topicId])
  );

  const currentQuestion = quizQuestions[currentIndex];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = isAnswered && selectedAnswer === currentQuestion.answer;
  const progress = (currentIndex + 1) / quizQuestions.length;

  function chooseAnswer(optionIndex) {
    if (isAnswered) return; // Do not allow changing an answer.
    setSelectedAnswer(optionIndex);
    if (optionIndex === currentQuestion.answer) {
      setScore(score + 1);
    }
  }

  function nextQuestion() {
  if (!isAnswered) return;

  if (currentIndex === quizQuestions.length - 1) {
    router.push({
      pathname: '/results',
      params: {
        score: String(score),
        total: String(quizQuestions.length),
        topicId: topic ? String(topic.id) : '',
      },
    });
  } else {
    setCurrentIndex(currentIndex + 1);
    setSelectedAnswer(null);
  }
}

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.overline}>TEST YOUR KNOWLEDGE</Text>
            <Text style={styles.title}>{topic ? topic.title + ' Quiz' : 'Cyber Safety Quiz'}</Text>
          </View>
          <View style={styles.quizIcon}>
            <Ionicons name="flash-outline" color={Colors.purple} size={25} />
          </View>
        </View>
        <Text style={styles.subtitle}>
          {topic ? 'A quick test on this lesson.' : '12 questions covering all the important topics.'}
        </Text>

        <View style={styles.progressInfo}>
          <Text style={styles.counter}>Question {currentIndex + 1} of {quizQuestions.length}</Text>
          <Text style={styles.counter}>{Math.round(progress * 100)}%</Text>
        </View>
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>

        <View style={styles.questionCard}>
          <View style={styles.questionBadge}>
            <Ionicons name="help" color={Colors.teal} size={17} />
            <Text style={styles.questionBadgeText}>CHOOSE ONE ANSWER</Text>
          </View>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <View style={styles.line} />
          <Text style={styles.helper}>Choose the best answer below.</Text>
        </View>

        <Text style={styles.answersHeading}>Your answer</Text>
        {currentQuestion.options.map((option, index) => {
          const correctChoice = isAnswered && index === currentQuestion.answer;
          const wrongChoice = isAnswered && index === selectedAnswer && !isCorrect;
          return (
            <Pressable
              key={index}
              onPress={() => chooseAnswer(index)}
              style={[
                styles.answerCard,
                correctChoice && styles.correctCard,
                wrongChoice && styles.wrongCard,
              ]}
            >
              <View style={[
                styles.answerLetter,
                correctChoice && { backgroundColor: '#D8F4E9' },
                wrongChoice && { backgroundColor: '#FBE4E5' },
              ]}>
                <Text style={styles.letterText}>{String.fromCharCode(65 + index)}</Text>
              </View>
              <Text style={styles.answerText}>{option}</Text>
              {correctChoice ? (
                <Ionicons name="checkmark-circle" size={22} color={Colors.green} />
              ) : wrongChoice ? (
                <Ionicons name="close-circle" size={22} color={Colors.red} />
              ) : (
                <Ionicons name="ellipse-outline" size={20} color="#C5CEDA" />
              )}
            </Pressable>
          );
        })}

        {isAnswered && (
          <View style={[styles.feedback, { backgroundColor: isCorrect ? '#E3F8F0' : '#FFF0F0' }]}>
            <View style={styles.feedbackTitleRow}>
              <Ionicons
                name={isCorrect ? 'checkmark-circle' : 'information-circle'}
                color={isCorrect ? Colors.green : Colors.red}
                size={22}
              />
              <Text style={[styles.feedbackTitle, { color: isCorrect ? Colors.green : Colors.red }]}>
                {isCorrect ? 'Correct! Well done.' : 'Not quite. Keep learning!'}
              </Text>
            </View>
            <Text style={styles.feedbackText}>{currentQuestion.explanation}</Text>
          </View>
        )}

        <Pressable
          disabled={!isAnswered}
          onPress={nextQuestion}
          style={[styles.nextButton, !isAnswered && styles.nextDisabled]}
        >
          <Text style={styles.nextText}>
            {currentIndex === quizQuestions.length - 1 ? 'See my results' : 'Next question'}
          </Text>
          <Ionicons name="arrow-forward" size={19} color={Colors.white} />
        </Pressable>
        {currentIndex < quizQuestions.length - 1 && (
  <Pressable
    style={styles.exitButton}
    onPress={() => router.replace('/(tabs)/topics')}
  >
    <Text style={styles.exitText}>
      Exit quiz and browse topics
    </Text>
  </Pressable>
)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 30, width: '100%', maxWidth: 800, alignSelf: 'center' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  overline: { color: Colors.teal, letterSpacing: 1.2, fontSize: 10, fontWeight: '900', marginBottom: 7 },
  title: { flexShrink: 1, fontSize: 26, color: Colors.text, fontWeight: '900' },
  quizIcon: { width: 49, height: 49, borderRadius: 17, backgroundColor: '#EDEAFF', justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  subtitle: { color: Colors.grey, fontSize: 13, marginTop: 8, marginBottom: 27 },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  counter: { color: Colors.text, fontWeight: '800', fontSize: 13 },
  progressBackground: { height: 9, borderRadius: 6, backgroundColor: '#DDE5EF', overflow: 'hidden', marginBottom: 24 },
  progressFill: { height: '100%', backgroundColor: Colors.teal, borderRadius: 6 },
  questionCard: { backgroundColor: Colors.navy, borderRadius: 23, padding: 22, minHeight: 196, marginBottom: 24 },
  questionBadge: { backgroundColor: '#244B60', borderRadius: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 7, paddingHorizontal: 11, paddingVertical: 7, marginBottom: 19 },
  questionBadgeText: { color: '#B2EBE6', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  questionText: { fontSize: 20, color: Colors.white, fontWeight: '800', lineHeight: 29 },
  line: { height: 1, backgroundColor: '#35516A', marginTop: 19, marginBottom: 10 },
  helper: { color: '#B5C7D9', fontSize: 12 },
  answersHeading: { color: Colors.text, fontSize: 17, fontWeight: '900', marginBottom: 12 },
  answerCard: { backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 16, marginBottom: 11, borderWidth: 1.5, borderColor: Colors.border, gap: 12 },
  correctCard: { backgroundColor: '#ECFAF3', borderColor: Colors.green },
  wrongCard: { backgroundColor: '#FFF3F3', borderColor: Colors.red },
  answerLetter: { width: 36, height: 36, borderRadius: 11, backgroundColor: '#F0F3F8', justifyContent: 'center', alignItems: 'center' },
  letterText: { color: Colors.text, fontWeight: '900', fontSize: 13 },
  answerText: { color: Colors.text, flex: 1, lineHeight: 20, fontSize: 13, fontWeight: '600' },
  feedback: { borderRadius: 16, padding: 16, marginTop: 10, marginBottom: 18 },
  feedbackTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 7 },
  feedbackTitle: { fontWeight: '900', fontSize: 14 },
  feedbackText: { color: '#516178', fontSize: 13, lineHeight: 21 },
  nextButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 16, padding: 18, backgroundColor: Colors.teal, marginTop: 11 },
  nextDisabled: { backgroundColor: '#A9CCC9' },
  nextText: { color: Colors.white, fontWeight: '900', fontSize: 14 },
  exitButton: { alignItems: 'center', padding: 16 },
  exitText: { color: Colors.grey, fontSize: 12, fontWeight: '700' },
});
