import { arrayMove } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";
import { useCallback } from "react";
import type { DragonOrder } from "../../types/dragon";

interface UseBottomRowDndParams {
  order: DragonOrder;
  setOrder: (order: DragonOrder) => void;
}

export function useBottomRowDnd(params: UseBottomRowDndParams) {
  const { order, setOrder } = params;

  return useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const oldIndex = order.indexOf(Number(active.id));
      const newIndex = order.indexOf(Number(over.id));

      if (oldIndex === -1 || newIndex === -1) return;

      setOrder(arrayMove(order, oldIndex, newIndex));
    },
    [order, setOrder],
  );
}
