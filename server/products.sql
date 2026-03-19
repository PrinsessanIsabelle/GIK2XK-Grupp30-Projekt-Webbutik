USE ecommerce;

START TRANSACTION;

DELETE FROM product_categories;
DELETE FROM ratings;
DELETE FROM cart_rows;
DELETE FROM products;

INSERT INTO categories (id, name, created_at, updated_at)
VALUES
	(101, 'Tea', NOW(), NOW()),
	(102, 'Fuzzy Drinks', NOW(), NOW()),
	(103, 'Energy Drinks', NOW(), NOW()),
	(104, 'Coffee', NOW(), NOW()),
	(105, 'Juice', NOW(), NOW()),
	(106, 'Water', NOW(), NOW())
ON DUPLICATE KEY UPDATE
	name = VALUES(name),
	updated_at = VALUES(updated_at);

INSERT INTO products (id, product_name, description, price, image_url, created_at, updated_at)
VALUES
	(
		1001,
		'Earl Grey Black Tea 20-pack',
		'Classic Earl Grey with bergamot aroma in 20 tea bags, perfect for morning or afternoon tea breaks.',
		39.00,
		'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1002,
		'Sparkling Lemon Soda 33cl',
		'Fuzzy lemon soda with fine bubbles and crisp citrus flavor, sold as a chilled single can.',
		14.00,
		'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1003,
		'Volt Energy Drink Original 50cl',
		'Carbonated energy drink with caffeine and B-vitamins for a quick energy boost before training or study.',
		22.00,
		'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1004,
		'Cold Brew Coffee 25cl',
		'Smooth ready-to-drink cold brew coffee with notes of chocolate and low acidity.',
		28.00,
		'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1005,
		'Orange Juice Not From Concentrate 1L',
		'Fresh-tasting orange juice with no added sugar, packed in a 1 liter carton.',
		31.00,
		'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1006,
		'Still Spring Water 50cl',
		'Natural still spring water in a recyclable bottle, ideal for everyday hydration.',
		10.00,
		'https://images.unsplash.com/photo-1564419439288-bd440f13f59d?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1007,
		'Peppermint Herbal Tea 20-pack',
		'Refreshing caffeine-free peppermint infusion in 20 tea bags for evening relaxation.',
		35.00,
		'https://images.unsplash.com/photo-1594631661960-7f55e0eec5d0?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1008,
		'Cola Zero 33cl',
		'Zero-sugar fuzzy cola with full flavor and lively carbonation.',
		13.00,
		'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1009,
		'Mango Energy Drink Sugar Free 50cl',
		'Sugar-free energy drink with mango flavor, caffeine and taurine.',
		24.00,
		'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1010,
		'Iced Latte Vanilla 25cl',
		'Chilled vanilla latte made with Arabica coffee and milk, ready to drink.',
		29.00,
		'https://images.unsplash.com/photo-1517701550927-30cf4ba1f9d0?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1011,
		'Apple Juice 1L',
		'Cloudy apple juice with balanced sweetness, made from pressed apples.',
		27.00,
		'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1012,
		'Sparkling Mineral Water Lime 50cl',
		'Refreshing carbonated mineral water with natural lime flavor.',
		12.00,
		'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	)
ON DUPLICATE KEY UPDATE
	product_name = VALUES(product_name),
	description = VALUES(description),
	price = VALUES(price),
	image_url = VALUES(image_url),
	updated_at = VALUES(updated_at);

INSERT INTO product_categories (id, product_id, category_id, created_at, updated_at)
VALUES
	(5001, 1001, 101, NOW(), NOW()),
	(5002, 1002, 102, NOW(), NOW()),
	(5003, 1003, 103, NOW(), NOW()),
	(5004, 1004, 104, NOW(), NOW()),
	(5005, 1005, 105, NOW(), NOW()),
	(5006, 1006, 106, NOW(), NOW()),
	(5007, 1007, 101, NOW(), NOW()),
	(5008, 1008, 102, NOW(), NOW()),
	(5009, 1009, 103, NOW(), NOW()),
	(5010, 1010, 104, NOW(), NOW()),
	(5011, 1011, 105, NOW(), NOW()),
	(5012, 1012, 106, NOW(), NOW()),
	(5013, 1003, 102, NOW(), NOW()),
	(5014, 1005, 106, NOW(), NOW()),
	(5015, 1009, 102, NOW(), NOW()),
	(5016, 1010, 103, NOW(), NOW()),
	(5017, 1012, 102, NOW(), NOW())
ON DUPLICATE KEY UPDATE
	product_id = VALUES(product_id),
	category_id = VALUES(category_id),
	updated_at = VALUES(updated_at);


INSERT INTO ratings (user_id, product_id, rating, body, created_at, updated_at) VALUES
(1, 1001, 5, 'Fantastiskt te, väldigt aromatiskt!', NOW(), NOW()),
(1, 1002, 4, 'Uppfriskande och god citronsmak.', NOW(), NOW()),
(1, 1003, 3, 'Bra energidryck men lite för söt.', NOW(), NOW()),
(1, 1004, 5, 'Bästa cold brew jag testat!', NOW(), NOW()),
(1, 1005, 4, 'Fräsch apelsinjuice utan tillsatt socker.', NOW(), NOW()),
(1, 1006, 3, 'Helt okej vatten, inget speciellt.', NOW(), NOW()),
(1, 1007, 5, 'Perfekt pepparmints te för kvällen.', NOW(), NOW()),
(1, 1008, 4, 'God cola utan socker, rekommenderas!', NOW(), NOW()),
(1, 1009, 2, 'Mangosmaker känns lite konstlad.', NOW(), NOW()),
(1, 1010, 5, 'Härlig vanilj latte, precis lagom söt.', NOW(), NOW()),
(1, 1011, 4, 'Mumsig äppeljuice med bra balans.', NOW(), NOW()),
(1, 1012, 3, 'Okej mineralvatten men inget wow.', NOW(), NOW());


COMMIT;
