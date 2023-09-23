import React from "react";
import Sidebar from "./Sidebar";
import TodoList from "./TodoList";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <TodoList />
      </main>
    </div>
  );
}

export default DashboardLayout;
