import { LIST_SWAP, TICKET_SWAP1, TICKET_SWAP2 } from "../actions/index";
import _ from "lodash";

const initialState = [
  {
    listName: "To Do",
    id: _.uniqueId(),
    tickets: [
      { title: "item 1", id: _.uniqueId() },
      { title: "item 2", id: _.uniqueId() },
      { title: "item 3", id: _.uniqueId() }
    ]
  },
  {
    listName: "Doing",
    id: _.uniqueId(),
    tickets: [
      { title: "item 4", id: _.uniqueId() },
      { title: "item 5", id: _.uniqueId() },
      { title: "item 6", id: _.uniqueId() }
    ]
  },
  {
    listName: "Done",
    id: _.uniqueId(),
    tickets: [
      { title: "item 7", id: _.uniqueId() },
      { title: "item 8", id: _.uniqueId() },
      { title: "item 9", id: _.uniqueId() }
    ]
  }
];

export default function(state = initialState, action) {
  switch (action.type) {
    case LIST_SWAP:
      const newListOrder = Array.from(state);
      const [temp] = newListOrder.splice(action.payload.sourceIndex, 1);
      newListOrder.splice(action.payload.destinationIndex, 0, temp);
      return newListOrder;
    case TICKET_SWAP1:
      return state.map(list => {
        if (list.id === action.payload.droppableId) {
          const temp = list;
          temp.tickets = action.payload.tickets;
          return temp;
        }
        return list;
      });
    case TICKET_SWAP2:
      return state.map(list => {
        if (list.id === action.payload.sourceDroppableId) {
          const temp1 = list;
          temp1.tickets =
            action.payload.tickets[action.payload.sourceDroppableId];
          return temp1;
        }
        if (list.id === action.payload.destinationDroppableId) {
          const temp2 = list;
          temp2.tickets =
            action.payload.tickets[action.payload.destinationDroppableId];
          return temp2;
        }
        return list;
      });
    default:
      return state;
  }
}
