import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default class List extends Component {
  render() {
    return (
      <div className="lists">
        <h1>{this.props.list.listName}</h1>
        <Droppable droppableId={this.props.list.id}>
          {provided => (
            <div className="ticketsDroppable" ref={provided.innerRef}>
              {this.props.list.tickets.map((ticket, index) => (
                <Draggable
                  key={ticket.id}
                  draggableId={ticket.id}
                  index={index}
                >
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>{ticket.title}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
