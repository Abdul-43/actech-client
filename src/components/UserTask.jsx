import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../global";


const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in.");
      return;
    }
    try {
      const res = await axios.get(`${API}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      setError("Failed to fetch tasks. Please try again.");
      console.error("Error fetching tasks", error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${API}/api/tasks`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks([...tasks, res.data]);
      setTitle("");
      setSuccess("Task added successfully!");
      setError("");
      fetchTasks();
    } catch (error) {
      setError("Failed to add task. Please try again.");
      setSuccess("");
      console.error("Error adding task", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">User Tasks</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleAddTask} className="mb-4">
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">
            Task Title
          </label>
          <input
            type="text"
            id="taskTitle"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <tr key={task._id}>
                <td>{i + 1}</td>
                <td>{task.title}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTasks;
