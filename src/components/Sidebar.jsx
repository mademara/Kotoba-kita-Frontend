import { NavLink, useNavigate } from 'react-router';

export function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <h1 className="sidebar-title">Kotoba Kita</h1>
        <p className="sidebar-slogan">
          Mulai belajar bahasa jepang dari titikmu sendiri
        </p>
      </header>

      <nav className="sidebar-nav">
        <NavLink to="/home" className="sidebar-navlink-btn">
          <span className="material-symbols-outlined">home</span>
          Beranda
        </NavLink>
        <NavLink to="/study" className="sidebar-navlink-btn">
          <span className="material-symbols-outlined">menu_book</span>
          Belajar
        </NavLink>
        <NavLink to="/decks" className="sidebar-navlink-btn">
          <span className="material-symbols-outlined">layers</span>
          Deck
        </NavLink>
        <NavLink to="/dictionary" className="sidebar-navlink-btn">
          <span className="material-symbols-outlined">translate</span>
          Kamus
        </NavLink>
      </nav>

      <footer className="sidebar-footer">
        <h3>Username</h3>
        <button onClick={handleLogout} className="sidebar-logout-btn">
          Keluar<span className="material-symbols-outlined">logout</span>
        </button>
      </footer>
    </aside>
  );
}
