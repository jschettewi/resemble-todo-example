import React from 'react';
import './Sidebar.css'; // Import your sidebar styles
import { TodoLists } from './gen/hello/v1/hello_rsm_react';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li>TodoList1</li>
        <li>TodoList2</li>
        <li>etc.</li>
      </ul>
    </div>
  );
};

export default Sidebar;