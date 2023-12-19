import React from 'react';
import './MainPage.css';
import { useState, useEffect } from "react";
import { TodoLists } from './gen/todo_app/v1/todo_app_rsm_react';

interface MainPageArgs {
  selectedTodoList: any;
}

const MainPage = ({ selectedTodoList } : MainPageArgs) => {

  const [todo, setTodo] = useState("");
  
  const { useListTodos } = TodoLists({ id: "todo-lists" });

  const {
    response,
    mutations: { AddTodo },
  } = useListTodos({ todolistId: "selected todo list id" });

  const todos = response?.todos || [];


  const onSubmitTodo = (event: any) => {
    event.preventDefault();
    console.log(selectedTodoList?.id)
    AddTodo({ todolistId: selectedTodoList?.id, todo: todo }).then(() => setTodo(""));
  };

  // Update todos when selectedTodoListId changes
  useEffect(() => {
    // Fetch todos based on the selectedTodoListId
  }, [selectedTodoList?.id]);

  return (
    <>
      <div className="main">
        <main>
          <h2>{selectedTodoList?.name}</h2>
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

  const { useListTodos } = TodoLists({ id: "todo-lists" });

  const {
    response,
    mutations: { DeleteTodo, CompleteTodo },
  } = useListTodos();

  const onCompleteTodo = () => {
    CompleteTodo( { todoId: id })
  }

  const onDeleteTodo = () => {
    DeleteTodo( { todoId: id });
  }

  return (
    <div key={id} className="todo">
      <button
        className={`todo-item ${complete ? "complete" : ""}`}
        onClick={() => onCompleteTodo()}
      >
        {text}
      </button>
      <button onClick={() => onDeleteTodo()}>x</button>
    </div>
  );
};

export default MainPage;