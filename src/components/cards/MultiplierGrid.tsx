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
              "w-16 h-16 flex items-center justify-center rounded-lg transition-all duration-300",
              isHighlighted
                ? value === "LOST"
                  ? "text-red-500 bg-[#0905058e] scale-110 shadow-lg brightness-110"
                  : "text-green-500 bg-[#0905058e] scale-110 shadow-lg brightness-110"
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
