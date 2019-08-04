import React from "react";
import TodoCard from "./TodoCard";
import Typography from "@material-ui/core/Typography";
import Zoom from "react-reveal/Zoom";

const TodoListTodo = props => {
  let cardNumber = 0;
  let todos = props.todos.map(todo => {
    cardNumber = cardNumber + 1;
    return (
      <TodoCard
        cn={cardNumber}
        id={todo._id}
        sub={todo.subject}
        desc={todo.desc}
        priority={todo.priority}
        addTo={todo.addTo}
        date={todo.date}
        key={cardNumber}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
        directUp={props.dUp}
      />
    );
  });
  return (
    <div>
      <Zoom>
        <Typography variant="h5" style={{ marginBottom: "10px",color:"#FFAE03" }}>
          To Do's
        </Typography>
        {todos}
      </Zoom>
    </div>
  );
};

export default TodoListTodo;
