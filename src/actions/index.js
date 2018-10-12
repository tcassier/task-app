export const LIST_SWAP = "LIST_SWAP";
export const TICKET_SWAP1 = "TICKET_SWAP1";
export const TICKET_SWAP2 = "TICKET_SWAP2";

export function listSwap(sourceIndex, destinationIndex) {
  return {
    type: LIST_SWAP,
    payload: {
      sourceIndex,
      destinationIndex
    }
  };
}

export function ticketSwap1(droppableId, tickets) {
  return {
    type: TICKET_SWAP1,
    payload: {
      droppableId,
      tickets
    }
  };
}

export function ticketSwap2(
  sourceDroppableId,
  destinationDroppableId,
  tickets
) {
  return {
    type: TICKET_SWAP2,
    payload: {
      sourceDroppableId,
      destinationDroppableId,
      tickets
    }
  };
}
