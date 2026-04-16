import { useGameStorePersisted as useGameStore } from "../lib/gameStore";
import { BottomRow } from "./cards/BottomRow";
import { MultiplierGrid } from "./cards/MultiplierGrid";
import { TopRow } from "./cards/TopRow";
import { useBottomRowDnd } from "./cards/useBottomRowDnd";

export function Cards() {
  const revealedTopCount = useGameStore((s) => s.revealedTopCount);
  const multipliers = useGameStore((s) => s.slotMultipliers);
  const topRowOrder = useGameStore((s) => s.shuffledTopRow);
  const bottomRowOrder = useGameStore((s) => s.playerBottomRow);
  const setBottomRowOrder = useGameStore((s) => s.setPlayerBottomRow);
  const highlightedSlots = useGameStore((s) => s.highlightedSlots);

  const handleDragEnd = useBottomRowDnd({
    order: bottomRowOrder,
    setOrder: setBottomRowOrder,
  });

  return (
    <div className="flex flex-col justify-center gap-6">
      <TopRow order={topRowOrder} revealedCount={revealedTopCount} />

      <div className="grid grid-cols-6 gap-y-3">
        <BottomRow order={bottomRowOrder} onDragEnd={handleDragEnd} />

        <MultiplierGrid
          multipliers={multipliers}
          highlightedSlots={highlightedSlots}
        />
      </div>
    </div>
  );
}
