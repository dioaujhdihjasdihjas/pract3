import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function submit(event) {
    event.preventDefault();
    localStorage.setItem('atelier-user', name || 'Гость');
    navigate('/dashboard');
  }

  return <section className="auth-page">
    <p className="eyebrow">ЛИЧНЫЙ КАБИНЕТ</p>
    <h1>Вход</h1>
    <form className="login-form" onSubmit={submit}>
      <label>Имя<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
      <label>Электронная почта<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
      <button type="submit">Войти</button>
    </form>
  </section>;
}
