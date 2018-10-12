import React, { Component } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { move, reorder } from "../tools/tools";
import { listSwap, ticketSwap1, ticketSwap2 } from "../actions/index";

import List from "../components/list";

class Board extends Component {
  onDragEnd = result => {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }

    if (type === "list") {
      this.props.listSwap(source.index, destination.index);
    } else {
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return;
      else if (source.droppableId === destination.droppableId) {
        const tickets = reorder(
          this.props.lists.find(list => list.id === source.droppableId).tickets,
          source.index,
          destination.index
        );

        this.props.ticketSwap1(source.droppableId, tickets);
      } else {
        const tickets = move(
          this.props.lists.find(list => list.id === source.droppableId).tickets,
          this.props.lists.find(list => list.id === destination.droppableId)
            .tickets,
          source,
          destination
        );

        this.props.ticketSwap2(
          source.droppableId,
          destination.droppableId,
          tickets
        );
      }
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId={_.uniqueId()}
          direction="horizontal"
          type="list"
        >
          {provided => (
            <div className="listsDroppable" ref={provided.innerRef}>
              {this.props.lists.map((list, index) => (
                <Draggable key={list.id} draggableId={list.id} index={index}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <List list={list} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(
  mapStateToProps,
  { listSwap, ticketSwap1, ticketSwap2 }
)(Board);
