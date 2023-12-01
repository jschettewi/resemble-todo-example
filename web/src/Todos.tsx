import "./App.css";
import { useState } from "react";
import { TodoList } from "./gen/todo_list/v1/todo_list_rsm_react";

export const Todos = () => {
  const [todo, setTodo] = useState("");

  const { useListTodos } = TodoList({ id: "todo-list" });

  const {
    response,
    mutations: { AddTodo },
  } = useListTodos();

  const todos = response?.todos || [];

  // const signOut = () => auth.signOut();

  const onSubmitTodo = (event: any) => {
    event.preventDefault();

    AddTodo({todo: todo}).then(() => setTodo(""));
  };

  return (
    <>
      {/* <header>
        <button onClick={signOut}>Sign Out</button>
      </header> */}
      <main>
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

// export default Todos;
