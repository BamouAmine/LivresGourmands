import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

function parseJwt(token) {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem('token') || '';
  const [token, setToken] = useState(initialToken);

  const [user, setUser] = useState(() => {
    if (initialToken) {
      const decoded = parseJwt(initialToken);
      if (decoded) {
        return { id: decoded.id, role: decoded.role, name: decoded.nom, nom: decoded.nom };
      }
    }

    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      setError('');
      const response = await api.post('/auth/login', credentials);
      const tokenValue = response.data.token;
      const decoded = parseJwt(tokenValue);
      setToken(tokenValue);
      setUser({ id: decoded?.id, role: decoded?.role, name: decoded?.nom, nom: decoded?.nom });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Connexion impossible');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      setError('');
      const response = await api.post('/auth/register', {
        nom: userData.name,
        email: userData.email,
        password: userData.password,
      });

      const tokenValue = response.data.token;
      const decoded = parseJwt(tokenValue);
      setToken(tokenValue);
      setUser({ id: decoded?.id, role: decoded?.role, name: decoded?.nom, nom: decoded?.nom });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur inscription');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    setError('');
  };

  return (
    <AuthContext.Provider value={{ user, token, error, login, logout, register, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);