import { Cards } from "./Cards";

export function GameBoard() {
  return (
    <div className="flex h-full max-h-175 w-full flex-col items-center justify-center bg-[url(/images/dragon-bg.png)] bg-cover bg-center p-6 max-lg:min-h-[22rem] max-lg:max-h-none max-lg:rounded-2xl max-lg:px-3 max-lg:py-5">
      <Cards />
    </div>
  );
}
