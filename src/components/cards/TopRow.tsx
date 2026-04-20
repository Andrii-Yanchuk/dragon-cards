import { FlipCard } from "../FlipCard";
import { DRAGONS } from "../../data/dragons";
import type { DragonOrder } from "../../types/dragon";

interface TopRowProps {
  order: DragonOrder;
  revealedCount: number;
}

export function TopRow(props: TopRowProps) {
  const { order, revealedCount } = props;

  return (
    <div className="flex gap-x-3">
      {order.map((id, index) => {
        const dragon = DRAGONS[id];
        return (
          <FlipCard
            key={index}
            front={dragon.image}
            back={dragon.frontImage}
            flipped={index < revealedCount}
          />
        );
      })}
    </div>
  );
}
