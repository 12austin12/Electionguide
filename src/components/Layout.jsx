import React, { useContext, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Map, Calendar, CheckCircle, Settings, Moon, Sun, Globe, X, PlayCircle, Sparkles } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Layout.css';

const Layout = () => {
  const { theme, toggleTheme, language, toggleLanguage, isFirstTimeVoter, setIsFirstTimeVoter } = useContext(AppContext);
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: { en: 'Home', es: 'Inicio' } },
    { path: '/guide', icon: <Map size={20} />, label: { en: 'Guide', es: 'Guía' } },
    { path: '/timeline', icon: <Calendar size={20} />, label: { en: 'Timeline', es: 'Calendario' } },
    { path: '/eligibility', icon: <CheckCircle size={20} />, label: { en: 'Eligibility', es: 'Elegibilidad' } },
    { path: '/simulator', icon: <PlayCircle size={20} />, label: { en: 'Simulator', es: 'Simulador' } },
  ];

  return (
    <div className="layout">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="navbar-content">
          <Link to="/" className="brand">
            <span className="brand-logo">🗳️</span>
            <span className="brand-name">Election Guide</span>
          </Link>
          <div className="nav-actions">
            <button className="icon-btn" onClick={toggleLanguage} title="Toggle Language">
              <Globe size={20} /> <span className="lang-text">{language.toUpperCase()}</span>
            </button>
            <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="icon-btn" onClick={() => setIsSettingsOpen(true)} title="Settings">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="page-container">
          {/* First Time Voter Banner */}
          {isFirstTimeVoter && (
            <div className="first-time-banner">
              <div className="banner-icon"><Sparkles size={24} /></div>
              <div className="banner-content">
                <h4>{language === 'en' ? 'First-Time Voter Mode Active' : 'Modo Votante Primerizo Activo'}</h4>
                <p>{language === 'en' ? 'We are highlighting extra beginner information to help you!' : '¡Estamos destacando información adicional para principiantes para ayudarte!'}</p>
              </div>
            </div>
          )}
          <Outlet />
        </div>
      </main>

      {/* Bottom Mobile Navigation / Sidebar on Desktop */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span className="nav-label">{item.label[language]}</span>
          </Link>
        ))}
      </nav>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="modal-overlay">
          <div className="modal card">
            <div className="modal-header">
              <h2>{language === 'en' ? 'Settings' : 'Configuraciones'}</h2>
              <button className="icon-btn" onClick={() => setIsSettingsOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="setting-group">
                <label>
                  <input
                    type="checkbox"
                    checked={isFirstTimeVoter}
                    onChange={(e) => setIsFirstTimeVoter(e.target.checked)}
                  />
                  {language === 'en' ? ' Enable First-Time Voter Mode' : ' Habilitar Modo de Votante Primerizo'}
                </label>
                <p className="setting-desc">
                  {language === 'en' ? 'Simplifies terms and provides extra guidance.' : 'Simplifica términos y proporciona orientación adicional.'}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setIsSettingsOpen(false)}>
                {language === 'en' ? 'Close' : 'Cerrar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
