import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import classNames from "classnames";
import { DRAGONS } from "../../constans/dragons";

function SortableCard(props: { id: number; dragon: (typeof DRAGONS)[0] }) {
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
        "relative flex cursor-grab flex-col items-center gap-3 active:cursor-grabbing sm:gap-4 lg:gap-5",
        { "z-10": isDragging },
      )}
    >
      <img
        className="h-22 w-11 rounded-xl object-cover sm:h-28 sm:w-14 md:h-36 md:w-18 lg:h-50 lg:w-25 lg:rounded-3xl"
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
