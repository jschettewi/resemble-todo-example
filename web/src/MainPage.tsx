import React from 'react';
import './MainPage.css';
import { useState, useEffect } from "react";
import { useTodoLists } from './gen/todo_app/v1/todo_lists_rsm_react';
import { useTodoList } from './gen/todo_app/v1/todo_list_rsm_react';
import '@fortawesome/fontawesome-free/css/all.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface MainPageArgs {
  selectedTodoList: any;
}

const MainPage = ({ selectedTodoList } : MainPageArgs) => {
  console.log("re-rendered")
  console.log(selectedTodoList?.id)
  // if the backend restarts the selectedTodolist.id will be the id of the old selectedTodolist

  const [todolistId, settodolistId] = useState(selectedTodoList?.id);

  const [todo, setTodo] = useState("");
  
  const { useListTodos, mutators } = useTodoList({ id: todolistId });

  console.log(`pending: ${mutators.addTodo.pending}`);


  const { response /* , isLoading */ } = useListTodos();

  const todos = response?.todos || [];


  const onSubmitTodo = (event: any) => {
    event.preventDefault();
    console.log("############");
    console.log(todolistId)
    mutators.addTodo({ todo: todo });
    setTodo("");
  };

  // Update todos when selectedTodoListId changes
  useEffect(() => {
    settodolistId(selectedTodoList?.id);
  }, [selectedTodoList.id]);

  return (
    <>
      <div className="main">
        <main>
          {selectedTodoList?.id && ( // Render only if selectedTodoList has an id
            <>
            <div className="todo-and-name">
              <h2 className="todo-list-name">{selectedTodoList?.name}</h2>
              <div className="todo-content">
                {todos.map(({ id, text, complete, deadline }) => (
                  <Todo key={id} text={text} id={id} complete={complete} deadline={deadline}
                  selectedTodoList={selectedTodoList}/>
                ))}
              <div/>
            </div>
            </div>
              <div className="todo-input-container">
                <form onSubmit={onSubmitTodo} className="todo-form">
                  <input
                    required
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="What's Next?"
                    className="new-todo-input"
                  />
                  <button type="submit" className="new-todo-submit-button">Add</button>
                </form>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

interface TodoArgs {
  id: string;
  text: string;
  complete: boolean;
  deadline: string;
  selectedTodoList: any;
}

const Todo = ({ id, text, complete, deadline, selectedTodoList }: TodoArgs) => {

  const { useListTodos, mutators } = useTodoList({ id: selectedTodoList?.id });

  const { response /* , isLoading */ } = useListTodos();

  // const [date, setDate] = useState(null);
  const [date, setDate] = useState<Date | null>(new Date());
  // const [date, setDate] = useState("");
  // const [date1, setDate1] = useState(new Date());

  const onCompleteTodo = () => {
    mutators.completeTodo( { todoId: id })
  }

  const onDeleteTodo = () => {
    mutators.deleteTodo( { todoId: id });
  }

  const onAddDeadline = (event: any) => {
    event.preventDefault();
    // const dateString = date?.toISOString();
    const dateString = "";
    console.log(dateString)
    mutators.addDeadline( {todoId: id, date: dateString} );
    
  }

  return (
    <div key={id} className="todo">
      <button onClick={() => onDeleteTodo()} className="todo-delete-button">
        <i className="fa fa-trash"></i>
      </button>
      <button
        className={`todo-item ${complete ? "complete" : ""}`}
        onClick={() => onCompleteTodo()}
      >
        <span>{text}</span>
      </button>
      {/* <form onSubmit={onAddDeadline} className="todo-form">
        <input
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Add a date"
          className=""
        />
      </form> */}
      <form onSubmit={onAddDeadline} className="todo-form">
        <DatePicker  
        showIcon
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mmaa"
        selected={date} 
        onChange={(date) => date && setDate(date)} 
        placeholderText="Select Deadline" 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MainPage;