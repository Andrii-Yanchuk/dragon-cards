import { useEffect, useRef } from "react";
import useSound from "use-sound";
import { useGameStorePersisted as useGameStore } from "../lib/gameStore";
import flipCardSound from "../assets/flip-card.mp3";
import gameOverSound from "../assets/game-over.mp3";
import winSound from "../assets/win-sound.mp3";

export function GameSounds() {
  const revealedTopCount = useGameStore((s) => s.revealedTopCount);
  const roundStatus = useGameStore((s) => s.roundStatus);
  const payout = useGameStore((s) => s.payout);
  const highlightedSlots = useGameStore((s) => s.highlightedSlots);
  const multipliers = useGameStore((s) => s.slotMultipliers);
  const soundEnabled = useGameStore((s) => s.soundEnabled);

  const previousRevealCount = useRef(revealedTopCount);
  const previousRoundStatus = useRef(roundStatus);

  const [playFlipCard] = useSound(flipCardSound, {
    volume: 0.4,
    interrupt: true,
    soundEnabled,
  });
  const [playGameOver] = useSound(gameOverSound, {
    volume: 0.55,
    soundEnabled,
  });
  const [playWin] = useSound(winSound, { volume: 0.55, soundEnabled });

  useEffect(() => {
    if (revealedTopCount > previousRevealCount.current) {
      playFlipCard();
    }

    previousRevealCount.current = revealedTopCount;
  }, [playFlipCard, revealedTopCount]);

  useEffect(() => {
    const roundJustFinished =
      previousRoundStatus.current !== "revealed" && roundStatus === "revealed";
    const hitLostMultiplier = highlightedSlots.some(
      (slotIndex) => multipliers[slotIndex] === "LOST",
    );

    if (roundJustFinished) {
      if ((payout ?? 0) > 0) {
        playWin();
      } else if (hitLostMultiplier) {
        playGameOver();
      }
    }

    previousRoundStatus.current = roundStatus;
  }, [
    highlightedSlots,
    multipliers,
    payout,
    playGameOver,
    playWin,
    roundStatus,
  ]);

  return null;
}
