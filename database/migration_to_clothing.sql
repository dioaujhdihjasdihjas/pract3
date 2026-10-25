ALTER TABLE services RENAME TO products;
ALTER TABLE appointments RENAME TO orders;
ALTER TABLE orders RENAME COLUMN service_id TO product_id;
ALTER TABLE orders RENAME COLUMN appointment_at TO ordered_at;
ALTER TABLE products RENAME COLUMN duration_minutes TO stock_quantity;
ALTER TABLE payments RENAME COLUMN appointment_id TO order_id;

UPDATE categories SET name = CASE id WHEN 1 THEN 'Рубашки' WHEN 2 THEN 'Верхняя одежда' WHEN 3 THEN 'Платья' WHEN 4 THEN 'Аксессуары' END WHERE id BETWEEN 1 AND 4;
UPDATE products SET category_id = 1, name = 'Льняная рубашка', description = 'Лёгкая рубашка из натурального льна.', stock_quantity = 12, price = 3490, discount_percent = 15 WHERE id = 1;
UPDATE products SET category_id = 2, name = 'Пальто прямого кроя', description = 'Классическое пальто на каждый день.', stock_quantity = 6, price = 10990, discount_percent = 0 WHERE id = 2;
UPDATE products SET category_id = 4, name = 'Кожаная сумка', description = 'Компактная сумка из экокожи.', stock_quantity = 8, price = 6790, discount_percent = 0 WHERE id = 3;
UPDATE products SET category_id = 3, name = 'Хлопковое платье', description = 'Свободное платье из мягкого хлопка.', stock_quantity = 10, price = 5290, discount_percent = 0 WHERE id = 4;
UPDATE products SET category_id = 1, name = 'Вязаный кардиган', description = 'Тёплый кардиган свободного кроя.', stock_quantity = 9, price = 4590, discount_percent = 20 WHERE id = 5;
UPDATE products SET category_id = 4, name = 'Шёлковый платок', description = 'Лёгкий акцент для вашего образа.', stock_quantity = 15, price = 1890, discount_percent = 0 WHERE id = 6;
