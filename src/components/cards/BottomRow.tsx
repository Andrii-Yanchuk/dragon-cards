import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import classNames from "classnames";
import { DRAGONS } from "../../constans/dragons";

function SortableCard(props: {
  id: number;
  dragon: (typeof DRAGONS)[0];
}) {
  const { id, dragon } = props;

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

export function BottomRow(props: {
  order: number[];
  onDragEnd: (event: DragEndEvent) => void;
}) {
  const { order, onDragEnd } = props;

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={order} strategy={rectSortingStrategy}>
        {order.map((id) => {
          const dragon = DRAGONS[id];
          return <SortableCard key={id} id={id} dragon={dragon} />;
        })}
      </SortableContext>
    </DndContext>
  );
}
