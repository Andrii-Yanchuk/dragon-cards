import { useGameStore } from "../lib/gameStore";

export function MultipliersRow() {
  const multipliers = useGameStore((s) => s.multipliers);

  return (
    <div className="flex gap-2">
      {multipliers.map((value, index) => (
        <div
          key={index}
          className="flex-1 bg-[#1f2028] border border-[#2e303a] rounded-lg py-4 text-center text-white"
        >
          {value}
        </div>
      ))}
    </div>
  );
}
