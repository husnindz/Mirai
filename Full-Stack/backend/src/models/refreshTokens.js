import pool from '../config/database.js';

export const insertRefreshToken = (token, userId, expiresAt) => {
  const SQLQuery = `INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES ($1, $2, $3) RETURNING token_id`;

  return pool.query(SQLQuery, [token, userId, expiresAt]);
};

export const findRefreshToken = (token) => {
  const SQLQuery = `SELECT * FROM refresh_tokens WHERE token = $1`;

  return pool.query(SQLQuery, [token]);
};

export const deleteRefreshToken = (token) => {
  const SQLQuery = `DELETE FROM refresh_tokens WHERE token = $1`;

  return pool.query(SQLQuery, [token]);
};

