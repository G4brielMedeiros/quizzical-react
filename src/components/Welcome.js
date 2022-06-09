export default function Welcome({ startGame }) {
  return (
    <div className="welcome">
      <h1>Quizzical</h1>
      <h2>Cool React quiz app</h2>
      <button onClick={startGame} className="start-button">
        Start quiz
      </button>
    </div>
  );
}
