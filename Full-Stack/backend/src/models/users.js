import pool from '../config/database.js';

export const insertUser = (email, password) => {
  const SQLQuery = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id, email`;

  return pool.query(SQLQuery, [email, password]);
};

export const findAllUsers = () => {
  const SQLQuery = `
    SELECT 
      u.user_id, 
      u.email, 
      p.name, 
      p.age, 
      p.gender, 
      u.created_at, 
      u.updated_at
    FROM users u
    LEFT JOIN profiles p ON u.user_id = p.user_id
  `;

  return pool.query(SQLQuery);
};

export const findUserById = (id) => {
  const SQLQuery = `
    SELECT 
      u.user_id, 
      u.email, 
      p.name, 
      p.age, 
      p.gender, 
      u.created_at, 
      u.updated_at
    FROM users u
    LEFT JOIN profiles p ON u.user_id = p.user_id
    WHERE u.user_id = $1
  `;

  return pool.query(SQLQuery, [id]);
};

export const findUserByEmail = (email) => {
  const SQLQuery = `
    SELECT 
      u.user_id, 
      u.email, 
      u.password, 
      p.name, 
      p.age, 
      p.gender, 
      u.created_at, 
      u.updated_at
    FROM users u
    LEFT JOIN profiles p ON u.user_id = p.user_id
    WHERE u.email = $1
  `;

  return pool.query(SQLQuery, [email]);
};
