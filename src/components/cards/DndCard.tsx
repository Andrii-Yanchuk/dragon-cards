import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";
import type { Dragon, DragonId } from "../../types/dragon";

interface SortableCardProps {
  id: DragonId;
  dragon: Dragon;
}

export function SortableCard(props: SortableCardProps) {
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
