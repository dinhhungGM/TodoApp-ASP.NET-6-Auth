
import {
  Routes, Route 
} from 'react-router-dom';

import LoginForm from './features/Auth/LoginForm';
import RegisterForm from './features/Auth/RegisterForm';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/register" element={<RegisterForm/>} />
    </Routes>
  );
}

export default App;
