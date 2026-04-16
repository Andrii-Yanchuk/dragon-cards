import "./App.css";
import { BalanceDisplay } from "./components/BalanceDisplay";
import { ControlPanel } from "./components/ControlPanel";
import { GameBoard } from "./components/GameBoard";

function App() {
  return (
    <main className="text-foreground flex w-full max-h-175 flex-row rounded-2xl max-lg:max-h-none max-lg:flex-col max-lg:gap-4">
      <BalanceDisplay className="hidden max-lg:flex" />

      <aside className="max-lg:order-3">
        <ControlPanel />
      </aside>

      <div className="game flex-1 max-lg:order-2">
        <GameBoard />
      </div>
    </main>
  );
}

export default App;
