import { create } from "zustand";

export type Risk = "Low" | "Medium" | "High" | "Classic";
export type GameStatus = "idle" | "playing" | "revealed";
export type Multiplier = number | "LOST";

const INITIAL_BALANCE = 1000;

export const RISK_MULTIPLIERS: Record<Risk, Multiplier[]> = {
  Low: ["LOST", 1, 2, 1, 2.5, 1.5],
  Medium: ["LOST", 3, 5, "LOST", 6, 1.5],
  High: ["LOST", "LOST", 25, "LOST", 50, "LOST"],
  Classic: ["LOST", 3.5, 4, "LOST", 10, 7],
};

interface GameStore {
  // State
  balance: number;
  bet: number;
  risk: Risk;
  status: GameStatus;
  multipliers: Multiplier[];
  order: number[];
  activeIndexes: number[];
  winAmount: number | null;

  // Actions
  setBet: (bet: number) => void;
  setRisk: (risk: Risk) => void;
  placeBet: () => void;
  setOrder: (order: number[]) => void;
  confirmPlacement: () => void;
  playAgain: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  balance: INITIAL_BALANCE,
  bet: 0,
  risk: "Low",
  status: "idle",
  multipliers: ["LOST", 1, 2, 1, 2.5, 1.5],
  order: [0, 1, 2, 3, 4, 5],
  activeIndexes: [],
  winAmount: null,

  setBet: (v) => {
    if (v < 0) return;
    set({ bet: Math.min(v, 1000) });
  },

  setRisk: (risk) => set({ risk, multipliers: [...RISK_MULTIPLIERS[risk]] }),

  setOrder: (order) => set({ order }),

  placeBet: () => {
    const { bet, balance, risk } = get();
    if (!bet || bet > balance) return;

    const multipliers = [...RISK_MULTIPLIERS[risk]].sort(
      () => Math.random() - 0.5,
    );

    set({
      balance: balance - bet,
      status: "playing",
      multipliers,
      activeIndexes: [],
      winAmount: null,
    });
  },

  confirmPlacement: () => {
    const { multipliers, bet } = get();

    // 🔥 генеруємо кілька активних позицій
    const count = Math.floor(Math.random() * 3) + 1; // 1–3 позиції

    const shuffledIndexes = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);

    const activeIndexes = shuffledIndexes.slice(0, count);

    // 🔍 беремо значення з цих позицій
    const values = activeIndexes.map((i) => multipliers[i]);

    // ❌ якщо хоч один LOST → програш
    const hasLost = values.includes("LOST");

    let winAmount: number | null = null;

    if (!hasLost) {
      const numericValues = values.filter((v): v is number => v !== "LOST");

      winAmount =
        numericValues.reduce((sum, v) => sum + (v as number), 0) * bet;
    } else {
      winAmount = 0;
    }

    set({
      activeIndexes,
      status: "revealed",
      winAmount,
    });
  },

  resetGame: () => {
    set({
      balance: INITIAL_BALANCE,
      bet: 0,
      risk: "Low",
      status: "idle",
      multipliers: [...RISK_MULTIPLIERS["Low"]],
      order: [0, 1, 2, 3, 4, 5],
      activeIndexes: [],
      winAmount: null,
    });
  },

  playAgain: () => {
    const { risk } = get();

    set({
      status: "idle",
      multipliers: [...RISK_MULTIPLIERS[risk]].sort(() => Math.random() - 0.5),
      order: [0, 1, 2, 3, 4, 5],
      activeIndexes: [],
      winAmount: null,
    });
  },
}));
