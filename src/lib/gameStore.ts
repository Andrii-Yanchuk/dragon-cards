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

function shuffle(array: number[]) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

interface GameStore {
  // State
  playerBalance: number;
  currentBet: number;
  risk: Risk;
  status: GameStatus;
  positionMultipliers: Multiplier[];
  topRowOrder: number[];
  bottomRowOrder: number[];
  winAmount: number | null;
  revealedTopPositions: number[];
  highlightedPositions: number[];

  // Actions
  setBet: (currentBet: number) => void;
  setRisk: (risk: Risk) => void;
  placeBet: () => void;
  setBottomRowOrder: (bottomRowOrder: number[]) => void;
  playAgain: () => void;
  resetGame: () => void;
  revealCards: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  playerBalance: INITIAL_BALANCE,
  currentBet: 1,
  risk: "Low",
  status: "idle",
  positionMultipliers: ["LOST", 1, 2, 1, 2.5, 1.5],
  topRowOrder: [0, 1, 2, 3, 4, 5],
  bottomRowOrder: [0, 1, 2, 3, 4, 5],
  winAmount: null,
  revealedTopPositions: [],
  highlightedPositions: [],

  revealCards: async () => {
    const total = 6;

    for (let i = 0; i < total; i++) {
      await new Promise((res) => setTimeout(res, 300));
      set((state) => ({
        revealedTopPositions: [...state.revealedTopPositions, i],
      }));
    }
  },

  setBet: (v) => {
    if (v < 0) return;
    set({ currentBet: Math.min(v, 1000) });
  },

  setRisk: (risk) =>
    set({ risk, positionMultipliers: [...RISK_MULTIPLIERS[risk]] }),

  setBottomRowOrder: (bottomRowOrder) => set({ bottomRowOrder }),

  placeBet: async () => {
    const { currentBet, playerBalance, revealCards } = get();

    if (!currentBet || currentBet > playerBalance) return;

    const shuffledTopRowOrder = shuffle([0, 1, 2, 3, 4, 5]);

    set({
      playerBalance: playerBalance - currentBet,
      status: "playing",
      winAmount: null,
      revealedTopPositions: [],
      topRowOrder: shuffledTopRowOrder,
    });

    await revealCards();

    const roundResults = get().topRowOrder.map((topId, i) => {
      const bottomId = get().bottomRowOrder[i];

      if (topId !== bottomId) return null;

      return get().positionMultipliers[i];
    });

    const hasLost = roundResults.includes("LOST");

    const winAmount = hasLost
      ? 0
      : roundResults
          .filter((v): v is number => typeof v === "number")
          .reduce((sum, v) => sum + v, 0) * get().currentBet;

    const highlightedPositions = roundResults
      .map((v, i) => (v !== null ? i : null))
      .filter((v): v is number => v !== null);

    set({
      status: "revealed",
      winAmount,
      highlightedPositions,
      playerBalance: get().playerBalance + winAmount,
    });
  },

  resetGame: () => {
    set({
      playerBalance: INITIAL_BALANCE,
      currentBet: 1,
      risk: "Low",
      status: "idle",
      positionMultipliers: [...RISK_MULTIPLIERS["Low"]],
      bottomRowOrder: [0, 1, 2, 3, 4, 5],
      winAmount: null,
      revealedTopPositions: [],
      highlightedPositions: [],
    });
  },

  playAgain: () => {
    set({
      status: "idle",
      bottomRowOrder: [0, 1, 2, 3, 4, 5],
      winAmount: null,
      revealedTopPositions: [],
      highlightedPositions: [],
    });
  },
}));
