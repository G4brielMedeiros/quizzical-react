import { nanoid } from "nanoid";
import { useState } from "react";

export default function Question({ running, question, selectAnswer }) {
  const [answers] = useState(() =>
    shuffleArray([...question.incorrect_answers, question.correct_answer])
  );

  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  function setCSS(answer) {
    if (running) {
      return question.selected === answer ? "selected-running" : "not-selected-running";
    }

    if (question.correct_answer === answer) return "correct-result";

    if (question.selected === answer) return "selected-incorrect-result";

    return "not-selected-result";
  }

  const answerElements = answers.map((answer) => (
    <button
      key={nanoid()}
      onClick={() => running && selectAnswer(question.id, answer)}
      className={"option " + setCSS(answer)}
    >
      {answer}
    </button>
  ));

  return (
    <article>
      <p className="question">{question.question}</p>
      <div className="options">{answerElements}</div>
    </article>
  );
}
