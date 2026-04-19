import { useState, useRef } from "react";

export function useBottomRowClick(
  order: number[],
  setOrder: (order: number[]) => void,
) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const didDragRef = useRef(false);

  function markDragHappened() {
    didDragRef.current = true;
  }

  function handleCardClick(id: number) {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }

    if (selectedId === null) {
      setSelectedId(id);
    } else if (selectedId === id) {
      setSelectedId(null);
    } else {
      const next = [...order];
      const a = next.indexOf(selectedId);
      const b = next.indexOf(id);
      [next[a], next[b]] = [next[b], next[a]];
      setOrder(next);
      setSelectedId(null);
    }
  }

  return { selectedId, handleCardClick, markDragHappened };
}
