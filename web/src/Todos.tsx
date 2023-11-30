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

    const newTodo = {
      id: todos.length,
      text: todo,
      complete: false,
    };

    AddTodo({todo: todo}).then(() => setTodo(""));

    //AddTodo({index: todos.length, text: todo, complete: false}).then(() => setTodo(""));
  
    //AddTodo({ id: todos.length, text: todo, complete: false}).then(() => setTodo(""));

    //AddTodo({ todo: todo, complete: true }).then(() => setTodo(""));
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
        {todos && todos.map(({ id, text, complete }) => <Todo key={id} text={text} index={id} complete={complete} />)}
        {/* {todos && todos.map((text, index, complete) => <Todo text={text} index={index} complete={false} />)} */}
      </main>
    </>
  );
};

interface TodoArgs {
  index: number;
  text: string;
  complete: boolean;
}

const Todo = ({ index, text, complete }: TodoArgs) => {

  const { useListTodos } = TodoList({ id: "todo-list" });

  const {
    response,
    mutations: { DeleteTodo, CompleteTodo },
  } = useListTodos();

  // const complete = false;
  // const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const onCompleteTodo = () => {
    console.log("complete todo");
    console.log(index);
    console.log(complete)
    CompleteTodo( { id: index })
    //complete = !complete
    console.log(complete)
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
