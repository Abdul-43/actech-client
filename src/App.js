
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';


function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
