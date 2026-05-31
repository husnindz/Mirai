import pool from '../config/database.js';

/**
 * Inserts a new user profile record.
 * @param {number} userId - The associated user's ID.
 * @param {string} name - The user's name.
 * @param {number} age - Age in years.
 * @param {number} gender - Gender (0 = Female, 1 = Male).
 * @returns {Promise} - PG query promise.
 */
export const insertProfile = (userId, name, age, gender) => {
  const SQLQuery = `
    INSERT INTO profiles (user_id, name, age, gender)
    VALUES ($1, $2, $3, $4)
    RETURNING profile_id, name, age, gender, user_id, created_at
  `;

  return pool.query(SQLQuery, [userId, name, age, gender]);
};

/**
 * Finds a profile by user ID.
 * @param {number} userId - The associated user's ID.
 * @returns {Promise} - PG query promise.
 */
export const findProfileByUserId = (userId) => {
  const SQLQuery = `
    SELECT * FROM profiles WHERE user_id = $1
  `;

  return pool.query(SQLQuery, [userId]);
};
