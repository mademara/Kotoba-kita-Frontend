import React, { useState } from 'react';
import { AuthPageJumbotron } from '../components/AuthPageJumbotron';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const [email, setEmail] = useState(
    location.state ? location.state.email : ''
  );
  const accountCreatedMsg = location.state?.message;
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Mohon lengkapi form untuk masuk ke halaman');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Kata sandi tidak boleh kurang dari 8 karakter');
      return;
    }
    setIsLoading(true);
    try {
      await login(email, password);

      navigate('/home');
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
          <h2>Selamat Datang</h2>
          <p>Masuk untuk melanjutkan perjalanan bahasa Anda</p>
        </section>
        <form onSubmit={handleLogin} className="auth-page-form">
          <label htmlFor="email-input">Email</label>
          <input
            autoComplete="email"
            disabled={isLoading}
            required
            value={email}
            onChange={(e) => {
              setErrorMessage('');
              setEmail(e.target.value);
            }}
            id="email-input"
            type="email"
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
            autoComplete="current-password"
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
          {!!errorMessage && (
            <p className="auth-error-message">{errorMessage}</p>
          )}
          {!!accountCreatedMsg && (
            <p className="auth-account-created">{accountCreatedMsg}</p>
          )}
          <button
            disabled={isLoading}
            type="submit"
            className="auth-page-button"
          >
            Masuk
          </button>
        </form>
        {isLoading ? (
          <section className="auth-page-to-register">
            <p className="auth-page-to-register-teks">
              Belum punya akun? Daftar
            </p>
          </section>
        ) : (
          <section className="auth-page-to-register">
            <p className="auth-page-to-register-teks">
              Belum punya akun?{' '}
              <Link to="/register" className="auth-page-to-register-link">
                Daftar
              </Link>
            </p>
          </section>
        )}
      </article>
    </main>
  );
}
