import { useGameStore } from "../lib/gameStore";

type BalanceDisplayProps = {
  className?: string;
};

export function BalanceDisplay({ className = "" }: BalanceDisplayProps) {
  const balance = useGameStore((s) => s.balance);

  return (
    <div
      className={`flex items-center justify-between rounded-2xl border border-[#2e303a] bg-(--code-bg) px-4 py-3 text-sm text-gray-400 ${className}`.trim()}
    >
      <span>Balance</span>
      <span className="text-base font-medium text-white">
        {balance.toLocaleString()}
      </span>
    </div>
  );
}
