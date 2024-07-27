import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../global";

import Admin from "./Admin";
import UserTasks from "./UserTask";
import Header from "./Header";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role");
      setRole(userRole);

      try {
        const resUsers = await axios.get(`${API}/api/users/count`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const resTasks = await axios.get(`${API}/api/tasks/count`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserCount(resUsers.data.count);
        setTaskCount(resTasks.data.count);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h4>Dashboard</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="alert alert-primary" role="alert">
                  <h5 className="alert-heading">Active User Count</h5>
                  <p>{userCount}</p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="alert alert-info" role="alert">
                  <h5 className="alert-heading">Total Task Count</h5>
                  <p>{taskCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {role === "Admin" ? <Admin /> : <UserTasks />}
      </div>
    </>
  );
};

export default Dashboard;
