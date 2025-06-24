import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Singup from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/singup" element={<Singup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
