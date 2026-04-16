import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { useGameStore } from "../lib/gameStore";
import { CSS } from "@dnd-kit/utilities";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import classNames from "classnames";
import { FlipCard } from "./FlipCard";
import { DRAGONS } from "../constans/dragons";

function SortableCard({
  id,
  dragon,
}: {
  id: number;
  dragon: (typeof DRAGONS)[0];
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={classNames(
        "relative flex flex-col items-center gap-5 cursor-grab active:cursor-grabbing",
        { "z-10": isDragging },
      )}
    >
      <img
        className="w-25 h-50 object-cover rounded-3xl"
        src={dragon.frontImage}
        alt={dragon.name}
      />
    </div>
  );
}

export function Cards() {
  const revealedTopPositions = useGameStore((s) => s.revealedTopPositions);
  const multipliers = useGameStore((s) => s.positionMultipliers);
  const topRowOrder = useGameStore((s) => s.topRowOrder);
  const bottomRowOrder = useGameStore((s) => s.bottomRowOrder);
  const setBottomRowOrder = useGameStore((s) => s.setBottomRowOrder);
  const highlightedPositions = useGameStore((s) => s.highlightedPositions);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = bottomRowOrder.indexOf(Number(active.id));
    const newIndex = bottomRowOrder.indexOf(Number(over.id));

    const newOrder = arrayMove(bottomRowOrder, oldIndex, newIndex);

    setBottomRowOrder(newOrder);
  };

  return (
    <div className="grid grid-cols-6 justify-center gap-4 gap-y-10">
      {topRowOrder.map((id, index) => {
        const dragon = DRAGONS[id];
        return (
          <FlipCard
            key={dragon.id}
            front={dragon.image}
            back={dragon.frontImage}
            flipped={revealedTopPositions.includes(index)}
          />
        );
      })}

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={bottomRowOrder} strategy={rectSortingStrategy}>
          {bottomRowOrder.map((id) => {
            const dragon = DRAGONS[id];

            return <SortableCard key={id} id={id} dragon={dragon} />;
          })}
        </SortableContext>
      </DndContext>

      {multipliers.map((value, index) => {
        const isHighlighted = highlightedPositions.includes(index);
        return (
          <div
            key={index}
            className={`
        w-16 h-16 flex items-center justify-center rounded-lg
        transition-all duration-300
        ${
          isHighlighted
            ? value === "LOST"
              ? "text-red-500 bg-[#0905058e]  scale-110 shadow-lg"
              : "text-green-500 bg-[#0905058e] scale-110 shadow-lg"
            : "bg-[#0905058e] text-white"
        }
      `}
          >
            {value === "LOST" ? "LOST" : `${value}x`}
          </div>
        );
      })}
    </div>
  );
}
