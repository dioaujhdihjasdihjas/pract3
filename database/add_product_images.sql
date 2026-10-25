ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=700&q=85' WHERE id = 1;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=700&q=85' WHERE id = 2;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85' WHERE id = 3;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85' WHERE id = 4;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=85' WHERE id = 5;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=700&q=85' WHERE id = 6;
