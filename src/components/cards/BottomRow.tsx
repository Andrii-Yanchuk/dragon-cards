import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { DRAGONS } from "../../data/dragons";
import type { DragonOrder } from "../../types/dragon";
import { SortableCard } from "./DndCard";

interface BottomRowProps {
  order: DragonOrder;
  onDragEnd: (event: DragEndEvent) => void;
  disabled?: boolean;
}

export function BottomRow(props: BottomRowProps) {
  const { order, onDragEnd, disabled = false } = props;

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={order} strategy={rectSortingStrategy}>
        {order.map((id) => {
          const dragon = DRAGONS[id];
          return (
            <SortableCard
              key={id}
              id={id}
              dragon={dragon}
              disabled={disabled}
            />
          );
        })}
      </SortableContext>
    </DndContext>
  );
}
