import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import Question from "./Question";

const API_URL =
  "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple";

export default function Game({ setShowGame }) {
  const [questions, setQuestions] = useState();
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(fetchQuestions, []);

  function fetchQuestions() {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) =>
        setQuestions(
          data.results.map((question) => ({
            ...question,
            question: decodeEntity(question.question),
            correct_answer: decodeEntity(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map((answer) =>
              decodeEntity(answer)
            ),
            selected: null,
            id: nanoid(),
          }))
        )
      );
  }

  function decodeEntity(inputStr) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
  }

  function selectAnswer(id, answer) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        return question.id === id ? { ...question, selected: answer } : { ...question };
      });
    });
  }

  function checkScore() {
    const finalScore = questions.filter(
      (question) => question.selected === question.correct_answer
    ).length;

    console.log(score);
    setScore(finalScore);

    setRunning(false);
  }

  function replay() {
    fetchQuestions();
    setShowGame(false);
  }

  return (
    questions && (
      <>
        <main>
          {questions.map((question) => (
            <Question
              key={question.id}
              running={running}
              question={question}
              selectAnswer={selectAnswer}
            />
          ))}
        </main>

        {!running && <p className="score">You scored {score}/5</p>}
        {score === 5 && <ReactConfetti height={document.body.scrollHeight} />}

        <button
          onClick={() => (running ? checkScore() : replay())}
          className="submit-button"
        >
          {running ? "Submit" : "Exit"}
        </button>
      </>
    )
  );
}
