INSERT INTO Roles (id, name) VALUES (1, 'Администратор'), (2, 'Клиент') ON CONFLICT (id) DO NOTHING;
INSERT INTO Categories (id, name) VALUES (1, 'Рубашки'), (2, 'Верхняя одежда'), (3, 'Платья'), (4, 'Аксессуары') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO Users (id, role_id, name, email, password_hash, coupon_code, coupon_percent) VALUES (1, 2, 'Кирилл Милованов', 'kirill@example.com', '123456', 'PERSONAL10', 10), (2, 1, 'Администратор', 'admin@lumen.ru', 'admin123', NULL, 0) ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash;
INSERT INTO Products (id, category_id, name, description, image_url, stock_quantity, price, discount_percent) VALUES
  (1, 1, 'Льняная рубашка', 'Лёгкая рубашка из натурального льна.', 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=700&q=85', 12, 3490, 15),
  (2, 2, 'Пальто прямого кроя', 'Классическое пальто на каждый день.', 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=700&q=85', 6, 10990, 0),
  (3, 4, 'Кожаная сумка', 'Компактная сумка из экокожи.', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85', 8, 6790, 0),
  (4, 3, 'Хлопковое платье', 'Свободное платье из мягкого хлопка.', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85', 10, 5290, 0),
  (5, 1, 'Вязаный кардиган', 'Тёплый кардиган свободного кроя.', 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=85', 9, 4590, 20),
  (6, 4, 'Шёлковый платок', 'Лёгкий акцент для вашего образа.', 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=700&q=85', 15, 1890, 0)
ON CONFLICT (id) DO UPDATE SET category_id = EXCLUDED.category_id, name = EXCLUDED.name, description = EXCLUDED.description, image_url = EXCLUDED.image_url, stock_quantity = EXCLUDED.stock_quantity, price = EXCLUDED.price, discount_percent = EXCLUDED.discount_percent;
INSERT INTO Orders (id, user_id, product_id, ordered_at, status) VALUES (1, 1, 1, '2026-10-30 15:00:00', 'Подтверждён') ON CONFLICT (id) DO NOTHING;
INSERT INTO Payments (id, order_id, amount, status, paid_at) VALUES (1, 1, 2966.50, 'Оплачен', '2026-10-25 12:00:00') ON CONFLICT (id) DO NOTHING;
