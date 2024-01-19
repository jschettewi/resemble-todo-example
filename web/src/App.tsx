import { FC, useState } from "react";
import css from "./App.module.css";

import Sidebar from './Sidebar';
import MainPage from './MainPage'

// We can choose any id we want because the state will be constructed when we
// make the first .writer call.
const STATE_MACHINE_ID = "resemble-todo_app";


const App = () => {

  const [selectedTodoList, setSelectedTodoList] = useState({id: "", name: ""});

  const handleTodoListClick = (id: string, name: string) => {
    setSelectedTodoList({ id, name });
  };

  return (
    <div className={css.app}>
      <Sidebar onTodoListClick={handleTodoListClick} selectedTodoList={selectedTodoList}/>
      {selectedTodoList.id && <MainPage key={selectedTodoList?.id} selectedTodoList={selectedTodoList}/>}
      {/* <MainPage key={selectedTodoList?.id} selectedTodoList={selectedTodoList}/> */}
    </div>
  );
};

export default App;
