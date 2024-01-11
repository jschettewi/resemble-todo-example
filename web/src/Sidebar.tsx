import React from 'react';
import './Sidebar.css'; // Import your sidebar styles
import { useState } from "react";
import { useTodoLists } from './gen/todo_app/v1/todo_lists_rsm_react';
import '@fortawesome/fontawesome-free/css/all.css';

const STATE_MACHINE_ID = "todo-lists" ;

interface SidebarArgs {
  onTodoListClick: any;
  selectedTodoList: any;
}


const Sidebar = ({ onTodoListClick, selectedTodoList } : SidebarArgs) => {

  const [text, setTodo] = useState("");

  const { useListTodoLists, mutators } = useTodoLists({ id: STATE_MACHINE_ID });

  const { response /* , isLoading */ } = useListTodoLists();

  const todolists = response?.todolists || [];

  // const onSubmitTodoList = (event: any) => {
  //   event.preventDefault();
  //   console.log(text)
  //   AddTodoList( {name: text} ).then(() => setTodo(""));
  // };

  const onSubmitTodoList = (event: any) => {
    event.preventDefault();
    mutators.addTodoList({ name: text }).then(() => setTodo(""));
  };

  console.log(todolists)

  return (
    <div className="sidebar">
      <h2>My Lists</h2>
      <form onSubmit={onSubmitTodoList} className="todolist-form">
        <i className="fa fa-plus-circle new-list-icon"></i>
        <input
          required
          value={text}
          onChange={(e) => setTodo(e.target.value)}
          className="new-todolist-input"
          placeholder="New List"
        />
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

  const { useListTodoLists, mutators } = useTodoLists({ id: STATE_MACHINE_ID });

  const { response /* , isLoading */ } = useListTodoLists();

  const onDeleteTodoList = () => {
    mutators.deleteTodoList( { id: id });
  }

  return (
    <div key={id} className="todo-list-container">
      <button onClick={onClickTodoList} className={`text-button ${isSelected ? 'selected' : ''}`}>
        { text }
      </button>
      <button onClick={() => onDeleteTodoList()} className="text-button delete-button">
        <i className="fa fa-trash"></i>
      </button>
    </div>
  );
};

export default Sidebar;