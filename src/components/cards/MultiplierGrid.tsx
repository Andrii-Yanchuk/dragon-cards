import classNames from "classnames";
import type { Multiplier } from "../../lib/gameStore";

export function MultiplierGrid(props: {
  multipliers: Multiplier[];
  highlightedSlots: number[];
}) {
  const { multipliers, highlightedSlots } = props;

  return (
    <>
      {multipliers.map((value, index) => {
        const isHighlighted = highlightedSlots.includes(index);

        return (
          <div
            key={index}
            className={classNames(
              "mx-auto flex h-10 w-10 items-center justify-center rounded-lg text-[10px] transition-all duration-300 sm:h-12 sm:w-12 sm:text-xs md:h-14 md:w-14 md:text-sm lg:h-16 lg:w-16",
              isHighlighted
                ? value === "LOST"
                  ? "text-red-500 bg-[#0905058e] scale-110"
                  : "text-green-500 bg-[#0905058e] scale-110"
                : "bg-[#0905058e] text-white brightness-100",
            )}
          >
            {value === "LOST" ? "LOST" : `${value}x`}
          </div>
        );
      })}
    </>
  );
}
