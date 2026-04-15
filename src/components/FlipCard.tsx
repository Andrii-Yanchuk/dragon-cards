import classNames from "classnames";

type FlipCardProps = {
  front: string;
  back: string;
  flipped: boolean;
};

export function FlipCard({ front, back, flipped }: FlipCardProps) {
  return (
    <div className="perspective-distant w-25 h-50 cursor-pointer">
      <div
        style={{}}
        className={classNames(
          "relative w-full h-full transform-3d transition-all duration-300",
          { "rotate-y-180": flipped },
        )}
      >
        {/* FRONT */}
        <img
          src={front}
          className="absolute w-full h-full object-cover rounded-3xl backface-hidden"
        />

        {/* BACK */}
        <img
          src={back}
          className="absolute w-full h-full object-cover rounded-3xl backface-hidden rotate-y-180"
        />
      </div>
    </div>
  );
}
