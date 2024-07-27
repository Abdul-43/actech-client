
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/admin" element={<Admin />} />
          <Route path="/user-tasks" element={<UserTask />} /> */}
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
