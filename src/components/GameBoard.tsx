import { Cards } from "./Cards";

export function GameBoard() {
  return (
    <div className="bg-[url(/images/dragon-bg.png)] bg-cover w-full h-full max-h-175 p-6 flex flex-col items-center justify-center">
      <Cards />
    </div>
  );
}
