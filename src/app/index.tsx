import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const questions = [
  { questionText: 'You can lead a cow down stairs but not up stairs.', isCorrect: false },
  { questionText: 'Approximately one quarter of human bones are in the feet.', isCorrect: true },
  { questionText: 'A slug\'s blood is green.', isCorrect: true },
  { questionText: 'Some cats are actually allergic to humans', isCorrect: true },
  { questionText: 'You can sneeze with your eyes open.', isCorrect: false },
];

export default function QuizzlerApp() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState<boolean[]>([]);

  const checkAnswer = (userAnswer: boolean) => {
    const isCorrect = questions[questionIndex].isCorrect === userAnswer;
    setScore(prev => [...prev, isCorrect]);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      Alert.alert(
        'Finished!',
        'You have reached the end of the quiz.',
        [
          {
            text: 'Restart',
            onPress: () => {
              setQuestionIndex(0);
              setScore([]);
            }
          }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {questions[questionIndex].questionText}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#4caf50' }]} 
          onPress={() => checkAnswer(true)}
        >
          <Text style={styles.buttonText}>True</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#f44336' }]} 
          onPress={() => checkAnswer(false)}
        >
          <Text style={styles.buttonText}>False</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scoreContainer}>
        {score.map((isCorrect, index) => (
          <MaterialIcons 
            key={index} 
            name={isCorrect ? "check" : "close"} 
            size={24} 
            color={isCorrect ? "#4caf50" : "#f44336"} 
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    paddingHorizontal: 15,
  },
  questionContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  button: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  }
});
