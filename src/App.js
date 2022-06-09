import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import Welcome from "./components/Welcome";

function App() {
  const [showGame, setShowGame] = useState(false);


  return (
    <div className="App">
      {showGame ? (
        <Game setShowGame={setShowGame}/>
      ) : (
        <Welcome startGame={() => setShowGame(true)} />
      )}
    </div>
  );
}

export default App;
