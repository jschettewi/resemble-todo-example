import React from 'react';
import './Sidebar.css'; // Import your sidebar styles
import MainPage from './MainPage'
import { useState } from "react";
import { TodoLists } from './gen/todo_app/v1/todo_app_rsm_react';

interface SidebarArgs {
  onTodoListClick: any;
  selectedTodoListId: any;
}


const Sidebar = ({ onTodoListClick, selectedTodoListId } : SidebarArgs) => {

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
        {todolists && todolists.map(({ id, name }) => <TodoList key={id} text={name} id={id} 
        onClick={() => onTodoListClick(id, name)} isSelected={selectedTodoListId === id}/>)}
    </div>
  );
};

interface TodoListArgs {
  id: string;
  text: string;
  onClick: any;
  isSelected: any;
}

const TodoList = ({ id, text, onClick, isSelected}: TodoListArgs) => {

  const { useListTodoLists } = TodoLists({ id: "todo-lists" });

  const {
    response,
    mutations: { DeleteTodoList },
  } = useListTodoLists();

  const onDeleteTodoList = () => {
    DeleteTodoList( { id: id });
  }

  const onClickTodoList = () => {
    console.log("Clicked list")
    console.log(id)
  }

  return (
    <div key={id}>
      <button onClick={onClick} className={isSelected ? 'selected' : ''}>
        {/* here we need to display the correct todo list*/}
        {/* <MainPage key={todolist_id} todolist_id={todolist_id} name={name} /> */}
        { text }
      </button>
      <button onClick={() => onDeleteTodoList()}>x</button>
    </div>
  );
};

export default Sidebar;