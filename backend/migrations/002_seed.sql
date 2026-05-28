SET client_encoding = 'UTF8';

INSERT INTO users (name, email, password_hash) VALUES
  ('Test User', 'test@test.com', 'hash123');

INSERT INTO trips (user_id, title, country, city, price, duration, description, image_url, includes, status, start_date, end_date) VALUES
  (1, 'Turkiya demaly sy', 'Turkiya', 'Antaliya', 450000, 7,
   'Zhororta tengizinin zhagsyndagy keremert demalys',
   'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
   'Ushu bileti, Konakuy, Tamak, Ekskursiya',
   'planned', '2025-07-01', '2025-07-08'),

  (1, 'Dubai sayahaty', 'BAE', 'Dubai', 800000, 5,
   'Dunieyuzіlik eng bіyk gymarat qalas',
   'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
   'Ushu bileti, 5* Konakuy, Burj Khalifa ekskursiyasy',
   'planned', '2025-08-10', '2025-08-15'),

  (1, 'Parij romantikasy', 'Frantsiya', 'Parij', 1200000, 6,
   'Eiffel munara sy, Luvr murajay',
   'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
   'Ushu bileti, Konakuy, Eiffel bileti, Luvr bileti',
   'planned', '2025-09-01', '2025-09-07'),

  (1, 'Bali araly', 'Indoneziya', 'Bali', 650000, 8,
   'Tropikalyk aralyn tabigaty',
   'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
   'Ushu bileti, Villa, Spa, Hram ekskursiyasy',
   'planned', '2025-10-01', '2025-10-09'),

  (1, 'Rim tarihy', 'Italiya', 'Rim', 950000, 5,
   'Kolizey, Vatikan',
   'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
   'Ushu bileti, Konakuy, Kolizey bileti',
   'planned', '2025-11-01', '2025-11-06');

INSERT INTO destinations (trip_id, city, country, order_index) VALUES
  (1, 'Antaliya', 'Turkiya', 1),
  (2, 'Dubai', 'BAE', 1),
  (3, 'Parij', 'Frantsiya', 1),
  (4, 'Bali', 'Indoneziya', 1),
  (5, 'Rim', 'Italiya', 1);

I