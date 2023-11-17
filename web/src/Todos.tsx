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

  const todos = response?.todos;

  // const signOut = () => auth.signOut();

  const onSubmitTodo = (event: any) => {
    event.preventDefault();

    AddTodo({ todo: todo }).then(() => setTodo(""));
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
        {todos && todos.map((text, index) => <Todo text={text} index={index} />)}
      </main>
    </>
  );
};

interface TodoArgs {
  text: string;
  index: number;
}

const Todo = ({ text, index }: TodoArgs) => {

  const { useListTodos } = TodoList({ id: "todo-list" });

  const {
    response,
    mutations: { DeleteTodo, CompleteTodo },
  } = useListTodos();

  const complete = false;
  // const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const onCompleteTodo = () => {
    console.log("complete todo");
    console.log(index);
    CompleteTodo( { id: index })
  }
  //   todosRef.doc(id).set({ complete: !complete }, { merge: true });

  const onDeleteTodo = () => {
    console.log("HERE");
    console.log(index);
    DeleteTodo( { id: index });
  } // todosRef.doc(id).delete();

  return (
    <div key={index} className="todo">
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
