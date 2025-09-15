#! /usr/bin/env node
import 'dotenv/config';
import { Client } from 'pg';

const SQL = `
CREATE TABLE IF NOT EXISTS colors (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    color VARCHAR(50) NOT NULL,
    hex VARCHAR(7)
);

CREATE TABLE IF NOT EXISTS sizes (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    size VARCHAR(10) NOT NULL,
    description VARCHAR(100),
    min_age INTEGER,
    max_age INTEGER
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS types (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    type VARCHAR(50) NOT NULL,
    id_categories INTEGER,
    CONSTRAINT fk_types_categories FOREIGN KEY (id_categories) REFERENCES categories(id)
);


CREATE TABLE IF NOT EXISTS clothes (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    id_sizes INTEGER,
    id_colors INTEGER,
    id_types INTEGER,
    CONSTRAINT fk_clothes_sizes FOREIGN KEY (id_sizes) REFERENCES sizes(id),
    CONSTRAINT fk_clothes_colors FOREIGN KEY (id_colors) REFERENCES colors(id),
    CONSTRAINT fk_clothes_types FOREIGN KEY (id_types) REFERENCES types(id)
);
`;

export default async function createTables() {
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
