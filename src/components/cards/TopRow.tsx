import { FlipCard } from "../FlipCard";
import { DRAGONS } from "../../constans/dragons";

export function TopRow(props: { order: number[]; revealedCount: number }) {
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
