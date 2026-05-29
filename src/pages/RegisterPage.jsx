import React, { useState } from 'react';
import { AuthPageJumbotron } from '../components/AuthPageJumbotron';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('Mohon lengkapi form Registrasi');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Kata sandi dan konfirmasi kata sandi tidak sesuai');
      return;
    }
    if (username.length > 30 || username.length < 3) {
      setErrorMessage(
        'Nama pengguna tidak boleh lebih dari 30 atau kurang dari 2 karakter'
      );
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Kata sandi tidak boleh kurang dari 8 karakter');
      return;
    }
    setIsLoading(true);

    try {
      const user = await register(username, email, password);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      if (user) {
        navigate('/login', {
          state: {
            message: 'Akun berhasil dibuat, silakan login!',
            email: user.email,
          },
        });
      } else {
        navigate('/login', {
          state: { message: 'Akun berhasil dibuat, silakan login!' },
        });
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <AuthPageJumbotron />
      <article className="auth-page-form-container">
        <section className="auth-page-wellcome">
          <h2>Daftar Akun</h2>
          <p>Mulai perjalanan belajar bahasa jepang Anda sekarang</p>
        </section>
        <form onSubmit={handleRegister} className="auth-page-form">
          <label htmlFor="username-input">Nama Pengguna</label>
          <input
            autoComplete="username"
            maxLength={20}
            disabled={isLoading}
            required
            value={username}
            onChange={(e) => {
              setErrorMessage('');
              setUsername(e.target.value);
            }}
            id="username-input"
            type="text"
          />
          <label htmlFor="email-input">Email</label>
          <input
            autoComplete="email"
            disabled={isLoading}
            required
            value={email}
            id="email-input"
            type="email"
            onChange={(e) => {
              setErrorMessage('');
              setEmail(e.target.value);
            }}
          />
          <div className="password-label">
            <label htmlFor="password-input">Kata Sandi</label>
            <button
              title={showPassword ? 'sembunyikan sandi' : 'tampilkan sandi'}
              type="button"
              onClick={handleShowPassword}
              className="show-password-btn"
            >
              <span className="material-symbols-outlined">
                {showPassword ? 'visibility' : 'visibility_off'}
              </span>
            </button>
          </div>
          <input
            autoComplete="new-password"
            disabled={isLoading}
            required
            value={password}
            onChange={(e) => {
              setErrorMessage('');
              setPassword(e.target.value);
            }}
            id="password-input"
            type={showPassword ? 'text' : 'password'}
          />
          <label htmlFor="confirm-password-input">Konfirmasi Kata Sandi</label>
          <input
            autoComplete="new-password"
            disabled={isLoading}
            required
            value={confirmPassword}
            onChange={(e) => {
              setErrorMessage('');
              setConfirmPassword(e.target.value);
            }}
            id="confirm-password-input"
            type={showPassword ? 'text' : 'password'}
          />
          {!!errorMessage && (
            <p className="auth-error-message">{errorMessage}</p>
          )}
          <button
            disabled={isLoading}
            type="submit"
            className="auth-page-button"
          >
            Daftar
          </button>
        </form>
        {isLoading ? (
          <section className="auth-page-to-register">
            <p className="auth-page-to-register-teks">
              Sudah punya akun? Masuk
            </p>
          </section>
        ) : (
          <section className="auth-page-to-register">
            <p className="auth-page-to-register-teks">
              Sudah punya akun?{' '}
              <Link to="/login" className="auth-page-to-register-link">
                Masuk
              </Link>
            </p>
          </section>
        )}
      </article>
    </main>
  );
}
