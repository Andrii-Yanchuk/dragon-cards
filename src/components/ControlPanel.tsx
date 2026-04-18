import { DollarSign } from "lucide-react";
import {
  useGameStorePersisted as useGameStore,
  type Risk,
} from "../lib/gameStore";
import classNames from "classnames";
import useSound from "use-sound";
import startGameSound from "../assets/start-game.mp3";
import { BalanceDisplay } from "./BalanceDisplay";

export function ControlPanel() {
  const bet = useGameStore((s) => s.betAmount);
  const setBet = useGameStore((s) => s.setBetAmount);
  const balance = useGameStore((s) => s.balance);
  const risk = useGameStore((s) => s.risk);
  const setRisk = useGameStore((s) => s.setRisk);
  const roundStatus = useGameStore((s) => s.roundStatus);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const startRound = useGameStore((s) => s.startRound);

  const handleHalf = () => setBet(bet / 2);
  const handleDouble = () => setBet(bet * 2);
  const handleMax = () => setBet(Math.min(balance, 1000));
  const [playStartGame] = useSound(startGameSound, {
    volume: 0.5,
    soundEnabled,
  });

  const isPanelLocked = roundStatus === "playing";
  const canStartRound = bet >= 1 && bet <= balance && !isPanelLocked;

  const handleStartRound = () => {
    if (!canStartRound) return;

    playStartGame();
    startRound();
  };

  return (
    <div className="flex h-full max-h-175 w-64 flex-col border-r border-[#2e303a] bg-(--code-bg) p-4 max-lg:h-auto max-lg:max-h-none max-lg:w-full max-lg:rounded-2xl max-lg:border-r-0 max-lg:border">
      <fieldset
        disabled={isPanelLocked}
        className={classNames("contents", {
          "pointer-events-none opacity-60": isPanelLocked,
        })}
      >
        {/* BET */}
        <div className="mb-4">
          <h2 className="w-fit text-sm text-gray-400 mb-2">Bet Amount</h2>

          <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
            <p>Max Bet: 1000.00</p>
            <DollarSign size={14} />
          </div>

          {/* INPUT + BUTTONS INLINE */}
          <div className="bg-[#1f2028] border border-[#2e303a] rounded-xl px-2 py-2 flex items-center gap-2">
            <input
              type="number"
              value={bet}
              onChange={(e) => setBet(Number(e.target.value))}
              min={1}
              step={0.01}
              max={1000}
              className="w-full bg-transparent outline-none text-white text-lg disabled:cursor-not-allowed
                [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
              onClick={handleHalf}
              className="text-xs px-2 py-1 bg-[#2e303a] hover:bg-[#3a3d4a] rounded-md transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              1/2
            </button>

            <button
              onClick={handleDouble}
              className="text-xs px-2 py-1 bg-[#2e303a] hover:bg-[#3a3d4a] rounded-md transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              x2
            </button>

            <button
              onClick={handleMax}
              className="text-xs px-2 py-1 bg-[#2e303a] hover:bg-[#3a3d4a] rounded-md transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              MAX
            </button>
          </div>
        </div>

        {/* RISK */}
        <div className="mb-4">
          <h2 className="w-fit text-sm text-gray-400 mb-2">Risk</h2>

          <div className="flex w-full gap-2">
            {["Low", "Medium", "High", "Classic"].map((r) => (
              <button
                key={r}
                onClick={() => setRisk(r as Risk)}
                className={classNames(
                  "bg-[#1f2028] border border-[#2e303a] rounded-lg py-2 text-sm hover:bg-[#2a2c36] transition cursor-pointer flex justify-center items-center flex-1 disabled:cursor-not-allowed disabled:opacity-50",
                  { "text-amber-300": r === risk },
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStartRound}
          disabled={!canStartRound}
          className="cursor-pointer rounded-xl bg-purple-500 py-3 font-medium text-white shadow-lg shadow-purple-500/20 transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-purple-500/50 disabled:text-white/70 disabled:shadow-none"
        >
          Place Bet
        </button>
      </fieldset>

      <BalanceDisplay className="mt-auto border-0 border-t border-[#2e303a] rounded-none px-0 pb-0 pt-4 max-lg:hidden" />
    </div>
  );
}
