import pool from './pool.js';

export default class Database {
    async getAllClothes() {
        try {
            const { rows } = await pool.query(`
                SELECT
                    c.id,
                    c.price,
                    c.description,
                    s.size,
                    s.description as size_description,
                    s.min_age,
                    s.max_age,
                    col.color,
                    col.hex,
                    t.type,
                    cat.category
                FROM clothes c
                    INNER JOIN sizes s ON c.id_sizes = s.id
                    INNER JOIN colors col ON c.id_colors = col.id
                    INNER JOIN types t ON c.id_types = t.id
                    INNER JOIN categories cat ON t.id_categories = cat.id
                ORDER BY c.id;
                `);
            return rows;
        } catch (error) {
            console.error('Error fetching clothes: ', error.message);
            throw new Error('Failed to fetch clothes data');
        }
    }
}