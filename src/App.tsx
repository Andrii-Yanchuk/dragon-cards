import "./App.css";
import { ControlPanel } from "./components/ControlPanel";

function App() {
  return (
    <main className="text-foreground flex flex-row">
      <aside>
        <ControlPanel />
      </aside>

      <div className="game"></div>
    </main>
  );
}

export default App;
