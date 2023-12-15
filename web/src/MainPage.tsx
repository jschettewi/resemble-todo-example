import React from 'react';
import './MainPage.css';
import { useState } from "react";
import { TodoLists, TodoList } from './gen/todo_app/v1/todo_app_rsm_react';

const MainPage = () => {
  return (
    <div className="main">
      <h2>Name of Todo List</h2>
      {/* Then we would return the todolist that we are on */}
    </div>
  );
};

export default MainPage;