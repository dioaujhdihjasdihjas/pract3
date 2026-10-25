import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';

const price = (value) => `${value.toLocaleString('ru-RU')} ₽`;

export default function CartPage() {
  const { items, itemCount, totalPrice, addItem, removeOne, removeItem, clearCart } = useCart();
  const location = useLocation();
  const addedProduct = location.state?.addedProduct;
  if (!items.length) return <section className="empty"><p className="eyebrow">ВАША КОРЗИНА</p><h1>Корзина пока пуста</h1><p>Добавьте одежду из каталога, чтобы увидеть её здесь.</p><Link className="primary-link" to="/catalog">Перейти в каталог</Link></section>;
  return <section><header className="page-intro"><p className="eyebrow">ВАША КОРЗИНА</p><h1>Выбранные вещи</h1></header>
    {addedProduct && <p className="success-message">«{addedProduct}» добавлен в корзину.</p>}
    <div className="cart-layout"><div className="cart-list">{items.map((item) => <article className="cart-row" key={item.id}><img src={item.image} alt="" /><div><p className="category">{item.category}</p><h2>{item.name}</h2><p>{price(item.price)} · {item.quantity} шт.</p><div className="quantity-actions"><button onClick={() => removeOne(item.id)} type="button">−</button><strong>{item.quantity}</strong><button onClick={() => addItem(item)} type="button">+</button></div></div><div className="cart-side"><strong>{price(item.price * item.quantity)}</strong><button className="text-button" onClick={() => removeItem(item.id)} type="button">Удалить</button></div></article>)}</div>
      <aside className="summary"><p>Товаров: {itemCount}</p><h2>Итого {price(totalPrice)}</h2><Link className="primary-link" to="/catalog">Продолжить покупки</Link><button className="clear" onClick={clearCart} type="button">Очистить корзину</button></aside></div>
  </section>;
}
