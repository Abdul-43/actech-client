import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../global';


const Admin = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUsersAndTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const resUsers = await axios.get(`${API}/api/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const resTasks = await axios.get(`${API}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });
       
        setUsers(resUsers.data);
        setTasks(resTasks.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsersAndTasks();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const { username, email, password, role } = e.target.elements;
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(`${API}/api/users`, {
        username: username.value,
        email: email.value,
        password: password.value,
        role: role.value
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers([...users, res.data.user]);
      setSuccessMessage('User added successfully');
      setError('');
    } catch (error) {
      console.error("Error adding user:", error);
      setError('Error adding user. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleApproveTask = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${API}/api/users/approve/${taskId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update tasks after approval
      const res = await axios.get(`${API}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
      setSuccessMessage('Task approved successfully');
      setError('');
    } catch (error) {
      console.error("Error approving task:", error);
      setError('Error approving task. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Panel</h2>

      {/* Error and Success Messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Add User Form */}
      <div className="mb-4">
        <h3>Add User</h3>
        <form onSubmit={handleAddUser}>
          <div className="form-group">
            <input type="text" name="username" className="form-control" placeholder="Username" required />
          </div>
          <div className="form-group">
            <input type="email" name="email" className="form-control" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="password" name="password" className="form-control" placeholder="Password" required />
          </div>
          <div className="form-group">
            <select name="role" className="form-control" required>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add User</button>
        </form>
      </div>

      {/* Users Table */}
      <div className="mb-4">
        <h3>Users</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tasks Table */}
      <div>
        <h3>Tasks</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>
                  {task.status === 'Pending' && (
                    <button onClick={() => handleApproveTask(task._id)} className="btn btn-success btn-sm">Approve</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
