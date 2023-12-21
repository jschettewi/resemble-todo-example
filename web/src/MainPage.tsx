import React from 'react';
import './MainPage.css';
import { useState, useEffect } from "react";
import { TodoLists } from './gen/todo_app/v1/todo_app_rsm_react';

interface MainPageArgs {
  selectedTodoList: any;
}

const MainPage = ({ selectedTodoList } : MainPageArgs) => {

  console.log(selectedTodoList?.id)

  const [todolistId, settodolistId] = useState(selectedTodoList?.id);

  const [todo, setTodo] = useState("");
  
  const { useListTodos } = TodoLists({ id: "todo-lists" });

  const {
    response,
    mutations: { AddTodo },
  } = useListTodos({ todolistId: todolistId });

  const todos = response?.todos || [];


  const onSubmitTodo = (event: any) => {
    event.preventDefault();
    console.log(selectedTodoList?.id)
    console.log(todolistId)
    AddTodo({ todolistId: selectedTodoList?.id, todo: todo }).then(() => setTodo(""));
  };

  // Update todos when selectedTodoListId changes
  useEffect(() => {
    // Fetch todos based on the selectedTodoListId
    settodolistId(selectedTodoList.id);
    
  }, [selectedTodoList]);

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
          {todos && todos.map(({ id, text, complete }) => <Todo key={id} text={text} id={id} complete={complete} 
          selectedTodoList={selectedTodoList}/>)}
        </main>
      </div>
    </>
  );
};

interface TodoArgs {
  id: string;
  text: string;
  complete: boolean;
  selectedTodoList: any;
}

const Todo = ({ id, text, complete, selectedTodoList }: TodoArgs) => {

  const { useListTodos } = TodoLists({ id: "todo-lists" });

  const {
    response,
    mutations: { DeleteTodo, CompleteTodo },
  } = useListTodos();

  const onCompleteTodo = () => {
    CompleteTodo( { todolistId: selectedTodoList?.id, todoId: id })
  }

  const onDeleteTodo = () => {
    DeleteTodo( { todolistId: selectedTodoList?.id, todoId: id });
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