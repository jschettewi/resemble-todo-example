import React from 'react';
import './Sidebar.css'; // Import your sidebar styles
import { useState } from "react";
import { TodoLists } from './gen/todo_app/v1/todo_app_rsm_react';


const Sidebar = () => {

  const [text, setTodo] = useState("");

  const { useListTodoLists } = TodoLists({ id: "todo-lists" });

  const {
    response,
    mutations: { AddTodoList },
  } = useListTodoLists();

  const todolists = response?.todolists || [];

  const onSubmitTodoList = (event: any) => {
    event.preventDefault();

    AddTodoList( {text: text} ).then(() => setTodo(""));
  };

  return (
    <div className="sidebar">
      <h2>My Lists</h2>
      <form onSubmit={onSubmitTodoList}>
          <input
            required
            value={text}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="What's Next?"
          />
          <button type="submit">Add</button>
        </form>
        {todolists && todolists.map(({ id, name }) => <TodoList key={id} text={name} id={id} />)}
    </div>
  );
};

interface TodoListArgs {
  id: string;
  text: string;
}

const TodoList = ({ id, text}: TodoListArgs) => {

  const { useListTodoLists } = TodoLists({ id: "todo-lists" });

  const {
    response,
    mutations: { DeleteTodoList },
  } = useListTodoLists();

  const onDeleteTodoList = () => {
    DeleteTodoList( { id: id });
  }

  return (
    <div key={id}>
      { text }
      <button onClick={() => onDeleteTodoList()}>x</button>
    </div>
  );
};

export default Sidebar;