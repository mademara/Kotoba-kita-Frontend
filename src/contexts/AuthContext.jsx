// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('access_token')
  );
  const [errorMessage, setErrorMessage] = useState('');

  const handlePureLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const handleForcedLogout = () => {
      handlePureLogout();
      alert('Sesi kamu telah berakhir. Silakan login kembali.');
    };

    window.addEventListener('auth_logout', handleForcedLogout);
    return () => window.removeEventListener('auth_logout', handleForcedLogout);
  }, []);

  const login = async (email, password) => {
    setErrorMessage('');
    try {
      const response = await axiosInstance.post('api/auth/login/', {
        email,
        password,
      });
      const data = response.data;

      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const statusGroup = Math.floor(status / 100);

        if (statusGroup === 4) {
          if (status === 401) throw new Error('Email atau password salah.');
          if (status === 429)
            throw new Error('Terlalu banyak mencoba. Silakan tunggu.');
          throw new Error('Gagal login karena kesalahan input.');
        }

        if (statusGroup === 5) {
          throw new Error('Server backend sedang bermasalah.');
        }
      } else if (error.request) {
        throw new Error(
          'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
        );
      } else {
        throw new Error(`Terjadi kesalahan sistem: ${error.message}`);
      }
    }
  };
  const register = async (username, email, password) => {
    setErrorMessage('');
    try {
      const response = await axiosInstance.post('api/auth/register/', {
        username,
        email,
        password,
      });
      const data = response.data;
      setUser(data.user);
      return data.user;
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const statusGroup = Math.floor(status / 100);
        const errorData = error.response.data;

        if (statusGroup === 4) {
          if (status === 429) {
            throw new Error('Terlalu banyak mencoba. Silakan tunggu.');
          }
          if (
            errorData?.username &&
            errorData.username[0].includes(
              'A user with that username already exists.'
            )
          ) {
            throw new Error(
              'Username sudah dipakai, mohon menggunakan username lain'
            );
          }
          if (
            errorData?.username &&
            errorData.username[0].includes('Enter a valid username')
          ) {
            throw new Error(
              'Username tidak boleh pakai spasi atau karakter khusus selain @/./+/-/_'
            );
          }
          if (
            errorData?.email &&
            errorData.email[0].includes('already exists')
          ) {
            throw new Error(
              'Email ini sudah terdaftar. Silakan gunakan email lain.'
            );
          }
          throw new Error('Gagal register karena kesalahan input.');
        }

        if (statusGroup === 5) {
          throw new Error('Server backend sedang bermasalah.');
        }
      } else if (error.request) {
        throw new Error(
          'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
        );
      } else {
        throw new Error(`Terjadi kesalahan sistem: ${error.message}`);
      }
    }
  };

  const logout = async () => {
    const refresh = localStorage.getItem('refresh_token');
    try {
      await axiosInstance.post('/api/auth/logout/', { refresh });
    } catch {
      // Abaikan jika request gagal, tetap lanjut hapus session di frontend
    } finally {
      handlePureLogout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        errorMessage,
        register,
        setErrorMessage,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
