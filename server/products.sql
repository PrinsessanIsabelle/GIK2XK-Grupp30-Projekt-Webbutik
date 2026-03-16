USE ecommerce;

START TRANSACTION;

DELETE FROM product_categories;
DELETE FROM ratings;
DELETE FROM cart_rows;
DELETE FROM products;

INSERT INTO categories (id, name, created_at, updated_at)
VALUES
	(101, 'Electronics', NOW(), NOW()),
	(102, 'Gaming', NOW(), NOW()),
	(103, 'Audio', NOW(), NOW()),
	(104, 'Home Office', NOW(), NOW()),
	(105, 'Accessories', NOW(), NOW()),
	(106, 'Smart Home', NOW(), NOW())
ON DUPLICATE KEY UPDATE
	name = VALUES(name),
	updated_at = VALUES(updated_at);

INSERT INTO products (id, product_name, description, price, image_url, created_at, updated_at)
VALUES
	(
		1001,
		'Aurora 15 Laptop',
		'15-inch laptop with Ryzen 7 processor, 16 GB RAM, 512 GB SSD and a matte display for everyday work and study.',
		11999.00,
		'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1002,
		'Nimbus Wireless Mouse',
		'Ergonomic wireless mouse with silent clicks, USB receiver and adjustable DPI for office and home use.',
		349.00,
		'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1003,
		'Pulse Mechanical Keyboard',
		'Compact Nordic-layout mechanical keyboard with tactile switches, RGB lighting and detachable USB-C cable.',
		899.00,
		'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1004,
		'Echo Studio Headphones',
		'Over-ear Bluetooth headphones with active noise cancellation and up to 30 hours of battery life.',
		1499.00,
		'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1005,
		'Arc 4K Monitor',
		'27-inch 4K IPS monitor with height adjustment, USB-C input and accurate colors for productivity.',
		3290.00,
		'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1006,
		'Orbit Smart Speaker',
		'Compact smart speaker with voice control, Wi-Fi streaming and room-filling sound for kitchens and living rooms.',
		799.00,
		'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1007,
		'Comet USB-C Hub',
		'Seven-port USB-C hub with HDMI, SD card reader, Ethernet and pass-through charging for laptops.',
		549.00,
		'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1008,
		'Vertex Gaming Chair',
		'Adjustable gaming chair with lumbar support, reclining backrest and breathable fabric upholstery.',
		2190.00,
		'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1009,
		'Nova Webcam Pro',
		'Full HD webcam with autofocus, dual microphones and privacy shutter for meetings and streaming.',
		699.00,
		'https://images.unsplash.com/photo-1587825140400-04d9c72c8934?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1010,
		'Drift Portable SSD 1TB',
		'Portable 1 TB SSD with USB 3.2 support, shock-resistant housing and fast file transfer speeds.',
		1190.00,
		'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1011,
		'Luma Desk Lamp',
		'LED desk lamp with touch controls, adjustable color temperature and integrated wireless charging pad.',
		459.00,
		'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
		NOW(),
		NOW()
	),
	(
		1012,
		'Apex Game Controller',
		'Wireless controller with textured grip, remappable buttons and USB-C charging for PC gaming.',
		649.00,
		'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1200&q=80',
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
	(5002, 1001, 104, NOW(), NOW()),
	(5003, 1002, 105, NOW(), NOW()),
	(5004, 1002, 104, NOW(), NOW()),
	(5005, 1003, 105, NOW(), NOW()),
	(5006, 1003, 104, NOW(), NOW()),
	(5007, 1004, 103, NOW(), NOW()),
	(5008, 1004, 101, NOW(), NOW()),
	(5009, 1005, 101, NOW(), NOW()),
	(5010, 1005, 104, NOW(), NOW()),
	(5011, 1006, 106, NOW(), NOW()),
	(5012, 1006, 103, NOW(), NOW()),
	(5013, 1007, 105, NOW(), NOW()),
	(5014, 1007, 101, NOW(), NOW()),
	(5015, 1008, 102, NOW(), NOW()),
	(5016, 1009, 101, NOW(), NOW()),
	(5017, 1009, 104, NOW(), NOW()),
	(5018, 1010, 101, NOW(), NOW()),
	(5019, 1010, 105, NOW(), NOW()),
	(5020, 1011, 104, NOW(), NOW()),
	(5021, 1011, 106, NOW(), NOW()),
	(5022, 1012, 102, NOW(), NOW()),
	(5023, 1012, 105, NOW(), NOW())
ON DUPLICATE KEY UPDATE
	product_id = VALUES(product_id),
	category_id = VALUES(category_id),
	updated_at = VALUES(updated_at);

COMMIT;
