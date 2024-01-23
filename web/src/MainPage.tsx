import React from 'react';
import './MainPage.css';
import { useState, useEffect } from "react";
import { useTodoList } from './gen/todo_app/v1/todo_list_rsm_react';
import '@fortawesome/fontawesome-free/css/all.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";

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

  // console.log(`pending: ${mutators.addTodo.pending}`);


  const { response /* , isLoading */ } = useListTodos();

  const todos = response?.todos || [];


  const onSubmitTodo = (event: any) => {
    event.preventDefault();
    mutators.addTodo({ todo: todo });
    setTodo("");
  };

  // Update todos when selectedTodoListId changes
  useEffect(() => {
    settodolistId(selectedTodoList?.id);
  }, [selectedTodoList]);

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

  const [ showDate, setshowDate ] = useState(false);

  const [date, setDate] = useState();
  //const [date, setDate] = useState<Date | null>(new Date());

  var isValidDate = false
  const deadlineDate = moment(deadline, 'DD/MM/YYYY').toDate()
  if (moment(deadline, 'DD/MM/YYYY').isValid()) {
    isValidDate = true
  }
  
  if (isValidDate) {
    // console.log("##########")
    // console.log(deadlineDate)
    // setDate(deadlineDate)
  }

  const onCompleteTodo = () => {
    mutators.completeTodo( { todoId: id })
  }

  const onDeleteTodo = () => {
    mutators.deleteTodo( { todoId: id });
  }

  const onAddDeadline = (event: any) => {
    event.preventDefault();
    const dateString = moment(date).format('DD/MM/YYYY')
    const dateString2 = moment(deadlineDate).format('DD/MM/YYYY')
    const dateString3 = '30/01/2024'
    mutators.addDeadline( {todoId: id, date: dateString} );
    setshowDate(false);
  }

  const onShowDatePicker = () => {
    setshowDate(true);
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
      <button
        className={`todo-delete-button ${showDate ? "showDate" : ""}`}
        onClick={() => onShowDatePicker() }>
        <i className="fa-solid fa-calendar"></i>
      </button>
      {
        showDate ?
        (
        <form onSubmit={onAddDeadline} className="todo-form">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            slotProps={{ textField: { size: 'small' } }}
            sx={{ width: "160px" }}
            className="datepicker"
            label="Select deadline"
            value={date}
            onChange={(newDate) => {
              newDate && setDate(newDate);
            }}
            />
          </LocalizationProvider>
          <button className="date-submit" type="submit">Submit</button>
        </form>
        )
        : null
      }
    </div>
  );
};

export default MainPage;
