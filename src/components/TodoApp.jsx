import React, { useState, useEffect } from "react";
import { FaTrash, FaCheckCircle } from "react-icons/fa";

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return alert("Task cannot be empty");
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    a.text.localeCompare(b.text)
  );

  return (
    <div className="container py-5" style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">📝 To-Do List</h2>

              <div className="input-group mb-3">
                <input
                  type="text"
                  value={task}
                  placeholder="Enter a task"
                  className="form-control"
                  onChange={(e) => setTask(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addTask}>
                  Add
                </button>
              </div>

              <div className="mb-3 d-flex justify-content-between align-items-center">
                <label className="form-label mb-0">Filter:</label>
                <select
                  className="form-select w-50"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <ul className="list-group">
                {sortedTasks.map((t) => (
                  <li
                    key={t.id}
                    className={`list-group-item d-flex justify-content-between align-items-center ${
                      t.completed ? "list-group-item-success" : ""
                    }`}
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => toggleCompletion(t.id)}
                      />
                      <label
                        className={`form-check-label ${
                          t.completed ? "text-decoration-line-through text-muted" : ""
                        }`}
                      >
                        {t.text}
                      </label>
                    </div>
                    <div>
                      {t.completed && <FaCheckCircle className="text-success me-2" />}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeTask(t.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {sortedTasks.length === 0 && (
                <p className="text-center mt-3 text-muted">No tasks found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

