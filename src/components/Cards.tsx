import { useGameStore } from "../lib/gameStore";

const DRAGON_THEMES = [
  {
    name: "fire",
    image: "./images/fire.png",
  },
  {
    name: "ice",
    image: "./images/frost.png",
  },
  {
    name: "storm",
    image: "./images/storm.png",
  },
  {
    name: "earth",
    image: "./images/earth.png",
  },
  {
    name: "shadow",
    image: "./images/shadow.png",
  },
  {
    name: "wind",
    image: "./images/empty.png",
  },
];

const DRAGON_BACKFACE = [
  {
    id: 0,
    image: "./images/backface.png",
  },
  {
    id: 1,
    image: "./images/backface.png",
  },
  {
    id: 2,
    image: "./images/backface.png",
  },
  {
    id: 3,
    image: "./images/backface.png",
  },
  {
    id: 4,
    image: "./images/backface.png",
  },
  {
    id: 5,
    image: "./images/backface.png",
  },
];

export function Cards() {
  const multipliers = useGameStore((s) => s.multipliers);
  return (
    <div className="grid grid-cols-6 justify-center gap-4 gap-y-10">
      {DRAGON_BACKFACE.map((dragon) => (
        <div className="" key={dragon.id}>
          <img
            className="w-25 h-50 object-cover rounded-3xl cursor-pointer"
            src={dragon.image}
            alt={dragon.image}
          />
        </div>
      ))}

      {DRAGON_THEMES.map((dragon, index) => (
        <div className="flex flex-col items-center gap-5" key={dragon.name}>
          <img
            className="w-25 h-50 object-cover rounded-3xl cursor-pointer"
            src={dragon.image}
            alt={dragon.name}
          />
          <div className="bg-[#0905058e] rounded-lg w-16 h-16 flex items-center justify-center text-white">
            {multipliers[index]}
          </div>
        </div>
      ))}
    </div>
  );
}
