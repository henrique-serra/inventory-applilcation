#! /usr/bin/env node
import 'dotenv/config';
import { Client } from 'pg';

const SQL = `
INSERT INTO colors (color, hex) VALUES 
  ('Pink', '#FFC0CB'),
  ('Blue', '#87CEEB'),
  ('Yellow', '#FFFF99'),
  ('White', '#FFFFFF'),
  ('Green', '#90EE90'),
  ('Red', '#FFB6C1'),
  ('Purple', '#DDA0DD'),
  ('Orange', '#FFDAB9'),
  ('Gray', '#D3D3D3'),
  ('Navy', '#191970');

INSERT INTO sizes (size, description, min_age, max_age) VALUES 
  ('NB', 'Newborn', 0, 1),
  ('0-3M', '0 to 3 months', 0, 3),
  ('3-6M', '3 to 6 months', 3, 6),
  ('6-9M', '6 to 9 months', 6, 9),
  ('9-12M', '9 to 12 months', 9, 12),
  ('12-18M', '12 to 18 months', 12, 18),
  ('18-24M', '18 to 24 months', 18, 24),
  ('2T', 'Toddler 2 years', 24, 30),
  ('3T', 'Toddler 3 years', 30, 36);

INSERT INTO categories (category) VALUES 
  ('Everyday Wear'),
  ('Sleepwear'),
  ('Outerwear'),
  ('Special Occasion'),
  ('Underwear'),
  ('Accessories');

INSERT INTO types (type, id_categories) VALUES 
  ('Bodysuit', 1),
  ('T-shirt', 1),
  ('Pants', 1),
  ('Dress', 1),
  ('Romper', 1),
  ('Pajamas', 2),
  ('Sleep Sack', 2),
  ('Nightgown', 2),
  ('Jacket', 3),
  ('Hoodie', 3),
  ('Sweater', 3),
  ('Coat', 3),
  ('Party Dress', 4),
  ('Formal Shirt', 4),
  ('Bow Tie', 4),
  ('Diaper', 5),
  ('Undershirt', 5),
  ('Hat', 6),
  ('Socks', 6),
  ('Bib', 6);

INSERT INTO clothes (price, description, id_sizes, id_colors, id_types) VALUES 
  (12.99, 'Soft cotton bodysuit with snap closure', 1, 4, 1),
  (14.99, 'Organic cotton bodysuit with cute animal print', 2, 1, 1),
  (13.50, 'Long sleeve bodysuit perfect for layering', 3, 2, 1),
  
  (16.99, 'Comfortable cotton t-shirt with funny saying', 4, 3, 2),
  (15.99, 'Striped t-shirt in soft bamboo fabric', 5, 5, 2),
  (18.99, 'Premium organic cotton tee with embroidered design', 6, 6, 2),
  
  (22.99, 'Elastic waist pants in durable cotton blend', 3, 9, 3),
  (25.99, 'Jogger pants with adjustable waistband', 4, 10, 3),
  (24.50, 'Leggings with fun pattern and stretchy fabric', 5, 7, 3),
  
  (28.99, 'Adorable summer dress with floral pattern', 6, 1, 4),
  (32.99, 'Tulle dress perfect for special occasions', 7, 4, 4),
  (26.99, 'Casual cotton dress with pockets', 8, 5, 4),
  
  (19.99, 'One-piece romper with snap bottom', 2, 8, 5),
  (21.99, 'Sleeveless romper ideal for warm weather', 3, 3, 5),
  (23.99, 'Denim-look romper with decorative buttons', 4, 2, 5),
  
  (17.99, 'Two-piece pajama set in soft cotton', 5, 1, 6),
  (19.99, 'Footed pajamas with zipper closure', 6, 2, 6),
  (29.99, 'Sleep sack for safe and cozy sleep', 1, 4, 7),
  (16.99, 'Nightgown in breathable bamboo fabric', 7, 7, 8),
  
  (39.99, 'Lightweight jacket with hood', 8, 9, 9),
  (34.99, 'Zip-up hoodie in warm fleece', 9, 10, 10),
  (42.99, 'Knit sweater with button closure', 7, 6, 11),
  (59.99, 'Winter coat with removable liner', 8, 4, 12),
  
  (45.99, 'Elegant party dress with sequin details', 6, 1, 13),
  (29.99, 'Formal shirt with bow tie included', 7, 4, 14),
  (8.99, 'Adjustable bow tie in satin finish', 8, 10, 15),
  
  (19.99, 'Pack of 5 cotton undershirts', 3, 4, 17),
  (24.99, 'Eco-friendly disposable diapers pack', 2, 4, 16),
  
  (9.99, 'Warm knit hat with cute ears design', 4, 1, 18),
  (7.99, 'Non-slip socks with fun patterns', 5, 5, 19),
  (12.99, 'Waterproof bib with food catcher', 6, 3, 20),
  (11.99, 'Sun hat with wide brim for protection', 7, 3, 18),
  (6.99, 'Cotton socks in rainbow colors', 8, 6, 19),
  (10.99, 'Silicone bib easy to clean', 9, 2, 20);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DATABASE}`,
    // "postgresql://<role_name>:<role_password>@localhost:5432/top_users"
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
