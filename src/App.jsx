import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SelectIngenieriaPage from './pages/SelectIngenieriaPage';
import GamePage from './pages/GamePage';
import './styles/global.css';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('user') !== null;
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/select-ingenieria" 
          element={
            <ProtectedRoute>
              <SelectIngenieriaPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/game" 
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;