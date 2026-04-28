import React, { useState } from 'react';
import { AuthPageJumbotron } from '../components/AuthPageJumbotron';
import { Link, useLocation, useNavigate } from 'react-router';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const accountCreatedMsg = location.state?.message;
  const [isLoading, setIsLoading] = useState(false);

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
    //aku make fetch boongan untuk kebutuhan loading animations, nanti implement rill nya
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 201,
            data: {
              access: 'token jewete',
              refresh: 'refresh jewete',
              user: {
                username: 'kotoba user',
                email: 'koto@user.com',
              },
            },
          });
        }, 5000);
      });
      const token = response.data.access;
      const tokenRefresh = response.data.refresh;
      localStorage.setItem('token', token);
      localStorage.setItem('refresh', tokenRefresh);
      setEmail('');
      setPassword('');
      navigate('/home');
    } catch (error) {
      setErrorMessage('Terjadi kesalahan');
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
