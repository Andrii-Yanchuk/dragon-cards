import "./App.css";
import { ControlPanel } from "./components/ControlPanel";
import { GameBoard } from "./components/GameBoard";

function App() {
  return (
    <main className="text-foreground flex flex-row w-full rounded-2xl">
      <aside>
        <ControlPanel />
      </aside>

      <div className="game">
        <GameBoard />
      </div>
    </main>
  );
}

export default App;
