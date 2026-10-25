import http from 'node:http';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'beauty_store',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

const send = (response, status, data) => response.writeHead(status, {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}).end(JSON.stringify(data));

const readBody = (request) => new Promise((resolve) => {
  let body = '';
  request.on('data', (chunk) => body += chunk);
  request.on('end', () => { try { resolve(JSON.parse(body || '{}')); } catch { resolve({}); } });
});

http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') return send(response, 204, {});
  const url = new URL(request.url, 'http://127.0.0.1:3001');
  try {
    if (request.method === 'GET' && url.pathname === '/api/categories') {
      const result = await pool.query('SELECT id, name FROM categories ORDER BY id');
      return send(response, 200, result.rows);
    }
    if (request.method === 'POST' && url.pathname === '/api/categories') {
      const body = await readBody(request);
      if (!body.name?.trim()) return send(response, 400, { message: 'Введите название категории.' });
      const result = await pool.query('INSERT INTO categories (id, name) VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM categories), $1) RETURNING id, name', [body.name.trim()]);
      return send(response, 201, result.rows[0]);
    }
    if (request.method === 'GET' && url.pathname === '/api/products') {
      const result = await pool.query(`
        SELECT s.id, s.category_id AS "categoryId", c.name AS "categoryName", s.name,
          s.description, s.image_url AS "imageUrl", s.stock_quantity AS "stockQuantity", s.price::float AS price,
          s.discount_percent::float AS "discountPercent",
          ROUND(s.price * (1 - s.discount_percent / 100.0), 2)::float AS "finalPrice"
        FROM products s JOIN categories c ON c.id = s.category_id ORDER BY s.id
      `);
      return send(response, 200, result.rows);
    }
    if (request.method === 'POST' && url.pathname === '/api/auth/login') {
      const body = await readBody(request);
      if (!body.email || !body.password) return send(response, 400, { message: 'Email и пароль обязательны.' });
      const result = await pool.query('SELECT id, name, email, coupon_code, coupon_percent FROM users WHERE email = $1 AND password_hash = $2', [body.email, body.password]);
      if (!result.rowCount) return send(response, 401, { message: 'Неверный email или пароль.' });
      const row = result.rows[0];
      return send(response, 200, { user: { id: row.id, name: row.name, email: row.email, coupon: row.coupon_code ? { name: row.coupon_code, percent: Number(row.coupon_percent) } : null } });
    }
    return send(response, 404, { message: 'Маршрут API не найден.' });
  } catch (error) {
    console.error(error.message);
    return send(response, 500, { message: 'Ошибка подключения к базе данных.' });
  }
}).listen(3001, () => console.log('API is running at http://127.0.0.1:3001'));
