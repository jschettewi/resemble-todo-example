import React from 'react';
import './Sidebar.css'; // Import your sidebar styles
import MainPage from './MainPage'
import { useState } from "react";
import { TodoLists } from './gen/todo_app/v1/todo_app_rsm_react';

interface SidebarArgs {
  onTodoListClick: any;
  selectedTodoList: any;
}


const Sidebar = ({ onTodoListClick, selectedTodoList } : SidebarArgs) => {

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
            className="new-todolist-input"
            placeholder="New List"
          />
          {/* <button type="submit">Add</button> */}
        </form>
        {todolists && todolists.map(({ id, name }) => <TodoList key={id} text={name} id={id} 
        onClickTodoList={() => onTodoListClick(id, name)} isSelected={selectedTodoList?.id === id}/>)}
    </div>
  );
};

interface TodoListArgs {
  id: string;
  text: string;
  onClickTodoList: any;
  isSelected: any;
}

const TodoList = ({ id, text, onClickTodoList, isSelected}: TodoListArgs) => {

  const { useListTodoLists } = TodoLists({ id: "todo-lists" });

  const {
    response,
    mutations: { DeleteTodoList },
  } = useListTodoLists();

  const onDeleteTodoList = () => {
    DeleteTodoList( { id: id });
  }

  // const onClickTodoList = () => {
  //   console.log("Clicked list")
  //   console.log(id)
  // }

  return (
    <div key={id} className="todo-list-container">
      <button onClick={onClickTodoList} className={`text-button ${isSelected ? 'selected' : ''}`}>
        { text }
      </button>
      <button onClick={() => onDeleteTodoList()} className="text-button delete-button">
        x
      </button>
    </div>
  );
};

export default Sidebar;