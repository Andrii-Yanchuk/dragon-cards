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
      className={classNames(
        "relative flex flex-col items-center gap-3 cursor-pointer sm:gap-4 lg:gap-5",
        { "z-10": isDragging },
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute right-2 top-2 bg-[#0905058e] rounded-full size-7 flex justify-center items-center cursor-grab active:cursor-grabbing "
      >
        ≡
      </div>
      <img
        className="h-22 w-11 rounded-xl object-cover sm:h-28 sm:w-14 md:h-36 md:w-18 lg:h-50 lg:w-25 lg:rounded-3xl"
        src={dragon.frontImage}
        alt={dragon.name}
      />
    </div>
  );
}
