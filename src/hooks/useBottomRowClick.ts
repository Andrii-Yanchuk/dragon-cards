import { useState, useRef } from "react";

export function useBottomRowClick(
  order: number[],
  setOrder: (order: number[]) => void,
) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const shouldIgnoreNextClickRef = useRef(false);

  function markDragHappened() {
    shouldIgnoreNextClickRef.current = true;
    setTimeout(() => {
      shouldIgnoreNextClickRef.current = false;
    }, 0);
  }

  function handleCardClick(id: number) {
    if (shouldIgnoreNextClickRef.current) {
      shouldIgnoreNextClickRef.current = false;
      return;
    }

    if (selectedId === null) return setSelectedId(id);
    if (selectedId === id) return setSelectedId(null);

    const nextOrder = [...order];
    const firstIndex = nextOrder.indexOf(selectedId);
    const secondIndex = nextOrder.indexOf(id);

    if (firstIndex === -1 || secondIndex === -1) {
      setSelectedId(null);
      return;
    }

    [nextOrder[firstIndex], nextOrder[secondIndex]] = [
      nextOrder[secondIndex],
      nextOrder[firstIndex],
    ];

    setOrder(nextOrder);
    setSelectedId(null);
  }

  return { selectedId, handleCardClick, markDragHappened };
}
