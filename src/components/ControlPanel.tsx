import { DollarSign } from "lucide-react";
import { useGameStore, type Risk } from "../lib/gameStore";
import classNames from "classnames";

export function ControlPanel() {
  const bet = useGameStore((s) => s.bet);
  const setBet = useGameStore((s) => s.setBet);
  const balance = useGameStore((s) => s.balance);
  const risk = useGameStore((s) => s.risk);
  const setRisk = useGameStore((s) => s.setRisk);
  const placeBet = useGameStore((s) => s.placeBet);

  const handleHalf = () => setBet(bet / 2);
  const handleDouble = () => setBet(bet * 2);
  const handleMax = () => setBet(Math.min(balance, 1000));

  return (
    <div className="w-64 h-full bg-(--code-bg) border-r border-[#2e303a] p-4 flex flex-col">
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
            min={0}
            max={1000}
            className="w-full bg-transparent outline-none text-white text-lg
              [appearance:textfield]
              [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none"
          />

          <button
            onClick={handleHalf}
            className="text-xs px-2 py-1 bg-[#2e303a] hover:bg-[#3a3d4a] rounded-md transition cursor-pointer"
          >
            1/2
          </button>

          <button
            onClick={handleDouble}
            className="text-xs px-2 py-1 bg-[#2e303a] hover:bg-[#3a3d4a] rounded-md transition cursor-pointer"
          >
            x2
          </button>

          <button
            onClick={handleMax}
            className="text-xs px-2 py-1 bg-[#2e303a] hover:bg-[#3a3d4a] rounded-md transition cursor-pointer"
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
                "bg-[#1f2028] border border-[#2e303a] rounded-lg py-2 text-sm hover:bg-[#2a2c36] transition cursor-pointer flex justify-center items-center flex-1",
                { "text-amber-300": r === risk },
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={placeBet}
        className="bg-purple-500 hover:bg-purple-600 transition rounded-xl py-3 text-white font-medium shadow-lg shadow-purple-500/20 cursor-pointer"
      >
        Place Bet
      </button>

      {/* BALANCE */}
      <div className="mt-auto pt-4 border-t border-[#2e303a] text-sm text-gray-400 flex justify-between">
        <span>Balance</span>
        <span className="text-white font-medium">
          {balance.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
