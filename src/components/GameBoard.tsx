import {
  Volume2 as VolumeIconOn,
  VolumeX as VolumeIconOff,
} from "lucide-react";
import { useGameStore } from "../lib/gameStore";
import { Cards } from "./Cards";
import { GameSounds } from "./GameSounds";

export function GameBoard() {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const toggleSoundEnabled = useGameStore((s) => s.toggleSoundEnabled);

  return (
    <div className="relative flex h-full max-h-175 w-full flex-col items-center justify-center bg-[url(/images/dragon-bg.webp)] bg-cover bg-center p-12 max-lg:min-h-88 max-lg:max-h-none max-lg:rounded-2xl max-lg:px-3 max-lg:py-5">
      <button
        type="button"
        onClick={toggleSoundEnabled}
        aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
        className="absolute left-4 top-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#2e303a] bg-[#1f2028]/90 text-white transition hover:bg-[#2a2c36] sm:w-10 sm:h-10"
      >
        {soundEnabled ? (
          <VolumeIconOn className="size-4 sm:size-6 " />
        ) : (
          <VolumeIconOff className="size-4 sm:size-6 " />
        )}
      </button>

      <GameSounds />
      <Cards />
    </div>
  );
}
