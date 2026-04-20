import classNames from "classnames";

type FlipCardProps = {
  front: string;
  back: string;
  flipped: boolean;
};

export function FlipCard({ front, back, flipped }: FlipCardProps) {
  return (
    <div className="perspective-distant h-22 w-11 sm:h-28 sm:w-14 md:h-36 md:w-18 lg:h-50 lg:w-25">
      <div
        className={classNames(
          "relative w-full h-full transform-3d transition-transform duration-300",
          { "rotate-y-180": flipped },
        )}
      >
        <img
          src={front}
          alt="front-image"
          className="absolute w-full h-full object-cover rounded-xl lg:rounded-3xl backface-hidden"
        />

        <img
          src={back}
          alt="back-image"
          className="absolute w-full h-full object-cover rounded-xl lg:rounded-3xl backface-hidden rotate-y-180"
        />
      </div>
    </div>
  );
}
