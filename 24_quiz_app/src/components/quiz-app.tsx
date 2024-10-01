"use client";

import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Button } from "./ui/button";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  answers: Answer[];
}

interface QuizState {
  currentQuestion: number;
  score: number;
  showResults: boolean;
  questions: Question[];
  isLoading: boolean;
}

const QuizApp = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    showResults: false,
    questions: [],
    isLoading: true,
  });

  const fetchQuestion = async () => {
    try {
      const req = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );

      const res = await req.json();
      const questions = res.results.map((val: any) => {
        const incorrectAnswers = val.incorrect_answers.map((ans: string) => ({
          text: ans,
          isCorrect: false,
        }));

        const correctAnswer = {
          text: val.correct_answer,
          isCorrect: true,
        };

        return {
          question: val.question,
          answers: [...incorrectAnswers, correctAnswer].sort(
            () => Math.random() - 0.5
          ),
        };
      });

      setState((prevState) => ({
        ...prevState,
        questions,
        isLoading: false,
      }));
    } catch (error) {
      console.log("Failed to fetch questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswerClick = (isCorrect: boolean): void => {
    if (isCorrect) {
      setState((prevState) => ({
        ...prevState,
        score: prevState.score + 1,
      }));
    }

    const nextQuestion = state.currentQuestion + 1;
    if (nextQuestion < state.questions.length) {
      setState((prevState) => ({
        ...prevState,
        currentQuestion: nextQuestion,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        showResults: true,
      }));
    }
  };

  const resetQuiz = (): void => {
    setState({
      currentQuestion: 0,
      score: 0,
      showResults: false,
      questions: state.questions,
      isLoading: false,
    });
  };

  if (state.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
        <ClipLoader />
        <p>Loading quiz questions, please wait...</p>
      </div>
    );
  }

  if (state.questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const currentQuestion = state.questions[state.currentQuestion];

  return (
    <div className="w-full max-w-md">
      {state.showResults ? (
        <div className="bg-card p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <p className="text-lg mb-4">
            You scored {state.score} out of {state.questions.length}
          </p>
          <Button onClick={resetQuiz} className="w-full">
            Try Again
          </Button>
        </div>
      ) : (
        <div className="bg-card rounded-lg shadow-lg p-10">
          <h2 className="text-2xl font-bold mb-5">
            Question {state.currentQuestion + 1}/{state.questions.length}
          </h2>
          <p
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          />    
          <div className="mt-5">
            {currentQuestion.answers.map((answer, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(answer.isCorrect)}
                className="block w-full mb-2"
              >
                {answer.text}
              </Button>
            ))}
          </div>
          <div className="mt-4 text-right">
            <span className="text-muted-foreground">Score: {state.score}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
