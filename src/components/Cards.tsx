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
import { useState } from "react";

const DRAGON_THEMES = [
  {
    name: "fire",
    image: "./images/fire.png",
  },
  {
    name: "ice",
    image: "./images/frost.png",
  },
  {
    name: "storm",
    image: "./images/storm.png",
  },
  {
    name: "earth",
    image: "./images/earth.png",
  },
  {
    name: "shadow",
    image: "./images/shadow.png",
  },
  {
    name: "wind",
    image: "./images/empty.png",
  },
];

const DRAGON_BACKFACE = [
  {
    id: 0,
    image: "./images/backface.png",
    frontImage: "./images/fire.png",
  },
  {
    id: 1,
    image: "./images/backface.png",
    frontImage: "./images/frost.png",
  },
  {
    id: 2,
    image: "./images/backface.png",
    frontImage: "./images/storm.png",
  },
  {
    id: 3,
    image: "./images/backface.png",
    frontImage: "./images/earth.png",
  },
  {
    id: 4,
    image: "./images/backface.png",
    frontImage: "./images/shadow.png",
  },
  {
    id: 5,
    image: "./images/backface.png",
    frontImage: "./images/empty.png",
  },
];

function SortableCard({
  id,
  dragon,
}: {
  id: number;
  dragon: (typeof DRAGON_THEMES)[0];
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
        src={dragon.image}
        alt={dragon.name}
      />
    </div>
  );
}

export function Cards() {
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const multipliers = useGameStore((s) => s.multipliers);
  const order = useGameStore((s) => s.order);
  const setOrder = useGameStore((s) => s.setOrder);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = order.indexOf(Number(active.id));
    const newIndex = order.indexOf(Number(over.id));

    const newOrder = arrayMove(order, oldIndex, newIndex);

    setOrder(newOrder);
  };

  const handleReveal = async () => {
    for (let i = 0; i <= DRAGON_BACKFACE.length; i++) {
      await new Promise((res) => setTimeout(res, 300));
      setFlippedIndexes((prev) => [...prev, i]);
    }
  };

  const handleReset = () => {
    setFlippedIndexes([]);
  };

  return (
    <div className="grid grid-cols-6 justify-center gap-4 gap-y-10">
      {DRAGON_BACKFACE.map((dragon) => {
        return (
          <FlipCard
            key={dragon.id}
            front={dragon.image}
            back={dragon.frontImage}
            flipped={flippedIndexes.includes(dragon.id)}
          />
        );
      })}

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={rectSortingStrategy}>
          {order.map((id) => {
            const dragon = DRAGON_THEMES[id];

            return <SortableCard key={id} id={id} dragon={dragon} />;
          })}
        </SortableContext>
      </DndContext>

      {multipliers.map((value, index) => (
        <div
          key={index}
          className="bg-[#0905058e] rounded-lg w-full h-16 flex items-center justify-center text-white"
        >
          {value === "LOST" ? "LOST" : `${value}x`}
        </div>
      ))}

      <div>
        <button onClick={handleReveal}>Reveal</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
