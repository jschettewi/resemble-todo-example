import React from 'react';
import './MainPage.css';
import { useState } from "react";
import { TodoLists, TodoList } from './gen/todo_app/v1/todo_app_rsm_react';

const MainPage = () => {

  const [todo, setTodo] = useState("");

  const { useListTodos } = TodoList({ id: "todo-list" });

  const {
    response,
    mutations: { AddTodo },
  } = useListTodos();

  const todos = response?.todos || [];


  const onSubmitTodo = (event: any) => {
    event.preventDefault();

    AddTodo({todo: todo}).then(() => setTodo(""));
  };

  return (
    <>
      <div className="main">
        <main>
          <h2>Name of todo list</h2>
          <form onSubmit={onSubmitTodo}>
            <input
              required
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="What's Next?"
            />
            <button type="submit">Add</button>
          </form>
          {todos && todos.map(({ id, text, complete }) => <Todo key={id} text={text} id={id} complete={complete} />)}
        </main>
      </div>
    </>
  );
};

interface TodoArgs {
  id: string;
  text: string;
  complete: boolean;
}

const Todo = ({ id, text, complete }: TodoArgs) => {

  const { useListTodos } = TodoList({ id: "todo-list" });

  const {
    response,
    mutations: { DeleteTodo, CompleteTodo },
  } = useListTodos();

  const onCompleteTodo = () => {
    CompleteTodo( { id: id })
  }

  const onDeleteTodo = () => {
    DeleteTodo( { id: id });
  }

  return (
    <div key={id} className="todo">
      <button
        className={`todo-item ${complete ? "complete" : ""}`}
        // tabIndex="0"
        onClick={() => onCompleteTodo()}
      >
        {text}
      </button>
      <button onClick={() => onDeleteTodo()}>x</button>
    </div>
  );
};

export default MainPage;