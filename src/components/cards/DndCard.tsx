import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";
import { motion } from "framer-motion";
import type { Dragon, DragonId } from "../../types/dragon";

interface SortableCardProps {
  id: DragonId;
  dragon: Dragon;
  disabled?: boolean;
  isSelected?: boolean;
  onClick?: (id: number) => void;
}

export function SortableCard(props: SortableCardProps) {
  const { id, dragon, disabled = false, isSelected = false, onClick } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
  } = useSortable({ id, disabled });

  const dndStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const cardClassName = classNames(
    "relative flex flex-col items-center gap-3 cursor-pointer sm:gap-4 lg:gap-5 ",
    {
      "z-10": isDragging,
      "opacity-60 cursor-not-allowed": disabled,
    },
  );

  return isSorting ? (
    <div
      ref={setNodeRef}
      style={dndStyle}
      onClick={() => !disabled && onClick?.(id)}
      className={cardClassName}
    >
      <div
        {...(disabled ? {} : attributes)}
        {...(disabled ? {} : listeners)}
        className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-[#0905058e] cursor-grab active:cursor-grabbing"
        onClick={(e) => e.stopPropagation()} // don't trigger card click from handle
      >
        :::
      </div>
      <img
        className={classNames(
          "h-22 w-11 rounded-xl object-cover sm:h-28 sm:w-14 md:h-36 md:w-18 lg:h-50 lg:w-25 lg:rounded-3xl transition-shadow duration-300",
          {
            "shadow-[0_0_12px_4px_var(--color-amber-400)]": isSelected,
            "hover:shadow-[0_0_12px_4px_var(--color-blue-400)]":
              !disabled && !isSelected,
          },
        )}
        src={dragon.frontImage}
        alt={dragon.name}
      />
    </div>
  ) : (
    <motion.div
      ref={setNodeRef}
      layout
      layoutId={`bottom-card-${id}`}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      onClick={() => !disabled && onClick?.(id)}
      className={cardClassName}
    >
      <div
        {...(disabled ? {} : attributes)}
        {...(disabled ? {} : listeners)}
        className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-[#0905058e] cursor-grab active:cursor-grabbing"
        onClick={(e) => e.stopPropagation()} // don't trigger card click from handle
      >
        :::
      </div>
      <img
        className={classNames(
          "h-22 w-11 rounded-xl object-cover sm:h-28 sm:w-14 md:h-36 md:w-18 lg:h-50 lg:w-25 lg:rounded-3xl transition-shadow duration-300",
          {
            "shadow-[0_0_12px_4px_var(--color-amber-400)]": isSelected,
            "hover:shadow-[0_0_12px_4px_var(--color-blue-400)]":
              !disabled && !isSelected,
          },
        )}
        src={dragon.frontImage}
        alt={dragon.name}
      />
    </motion.div>
  );
}
