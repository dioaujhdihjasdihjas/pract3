import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';

export default function DashboardPage() {
  const { itemCount, totalPrice } = useCart();
  const name = localStorage.getItem('atelier-user') || 'Гость';
  return <section className="dashboard-page">
    <p className="eyebrow">ЛИЧНЫЙ КАБИНЕТ</p>
    <h1>Здравствуйте, {name}!</h1>
    <p>В корзине: {itemCount} шт. на сумму {totalPrice.toLocaleString('ru-RU')} ₽.</p>
    <Link className="primary-link dashboard-link" to="/catalog">Перейти в каталог</Link>
  </section>;
}
