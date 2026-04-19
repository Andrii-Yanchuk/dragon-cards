import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Risk = "Low" | "Medium" | "High" | "Classic";
export type GameStatus = "idle" | "playing" | "revealed";
export type Multiplier = number | "LOST";

const INITIAL_BALANCE = 1000;
const ROUND_START_DELAY_MS = 450;
const CARD_FLIP_DELAY_MS = 300;

function normalizeBetAmount(value: number) {
  if (!Number.isFinite(value)) return 1;

  return Math.min(Math.max(Math.round(value * 100) / 100, 1), 1000);
}

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
  balance: number;
  betAmount: number;
  risk: Risk;
  soundEnabled: boolean;
  roundStatus: GameStatus;
  slotMultipliers: Multiplier[];
  shuffledTopRow: number[];
  playerBottomRow: number[];
  payout: number | null;
  revealedTopCount: number;
  highlightedSlots: number[];

  // Actions
  setBetAmount: (betAmount: number) => void;
  setRisk: (risk: Risk) => void;
  toggleSoundEnabled: () => void;
  startRound: () => void;
  setPlayerBottomRow: (playerBottomRow: number[]) => void;
  resetRound: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      balance: INITIAL_BALANCE,
      betAmount: 1,
      risk: "Low",
      soundEnabled: true,
      roundStatus: "idle",
      slotMultipliers: ["LOST", 1, 2, 1, 2.5, 1.5],
      shuffledTopRow: [0, 1, 2, 3, 4, 5],
      playerBottomRow: [0, 1, 2, 3, 4, 5],
      payout: null,
      revealedTopCount: 0,
      highlightedSlots: [],

      setBetAmount: (v) => {
        set({ betAmount: normalizeBetAmount(v) });
      },

      setRisk: (risk) =>
        set({ risk, slotMultipliers: [...RISK_MULTIPLIERS[risk]] }),

      toggleSoundEnabled: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),

      setPlayerBottomRow: (playerBottomRow) => set({ playerBottomRow }),

      startRound: async () => {
        const { betAmount, balance, playerBottomRow, slotMultipliers } = get();

        if (!betAmount || betAmount > balance) return;

        const shuffledTopRow = shuffle([0, 1, 2, 3, 4, 5]);

        set({
          balance: balance - betAmount,
          roundStatus: "playing",
          payout: null,
          revealedTopCount: 0,
          highlightedSlots: [],
          shuffledTopRow,
        });

        const total = 6;
        await new Promise((res) => setTimeout(res, ROUND_START_DELAY_MS));

        for (let i = 1; i <= total; i++) {
          await new Promise((res) => setTimeout(res, CARD_FLIP_DELAY_MS));
          set({ revealedTopCount: i });
        }

        let hasLost = false;
        let multiplierSum = 0;
        const highlightedSlots: number[] = [];

        for (let i = 0; i < total; i++) {
          if (shuffledTopRow[i] !== playerBottomRow[i]) continue;

          highlightedSlots.push(i);
          const multiplier = slotMultipliers[i];
          if (multiplier === "LOST") {
            hasLost = true;
          } else {
            multiplierSum += multiplier;
          }
        }

        const payout = hasLost ? 0 : multiplierSum * betAmount;

        set((state) => ({
          roundStatus: "revealed",
          payout,
          highlightedSlots,
          balance: state.balance + payout,
        }));
      },

      resetGame: () => {
        set({
          balance: INITIAL_BALANCE,
          betAmount: 1,
          risk: "Low",
          soundEnabled: true,
          roundStatus: "idle",
          slotMultipliers: [...RISK_MULTIPLIERS["Low"]],
          playerBottomRow: [0, 1, 2, 3, 4, 5],
          payout: null,
          revealedTopCount: 0,
          highlightedSlots: [],
        });
      },

      resetRound: () => {
        set({
          roundStatus: "idle",
          playerBottomRow: [0, 1, 2, 3, 4, 5],
          payout: null,
          revealedTopCount: 0,
          highlightedSlots: [],
        });
      },
    }),
    {
      name: "dragon-cards:v1",
      partialize: (state) => ({
        balance: state.balance,
        risk: state.risk,
        soundEnabled: state.soundEnabled,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.setRisk(state.risk);
      },
    },
  ),
);
