import { NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

export default function SiteHeader() {
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  return <header className="topbar">
    <NavLink className="brand" to="/catalog">atelier <span>m.</span></NavLink>
    <nav aria-label="Основная навигация">
      <NavLink to="/catalog">Каталог</NavLink>
      <NavLink to="/cart">Корзина <b>{itemCount}</b></NavLink>
      <NavLink to="/dashboard">Кабинет</NavLink>
      <NavLink to="/login">Вход</NavLink>
    </nav>
    <button className="theme-toggle" type="button" onClick={toggleTheme}>{theme === 'light' ? '☾ Тёмная тема' : '☼ Светлая тема'}</button>
  </header>;
}
