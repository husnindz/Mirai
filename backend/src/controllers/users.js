import { findAllUsers, findUserById } from '../models/users.js';

export async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const {
      rows: [data],
    } = await findUserById(id);

    if (!data) {
      return res.status(404).json({
        message: 'User not found!',
      });
    }

    res.status(200).json({
      message: 'Success to GET user data!',
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error to GET user data!',
      error: error.message,
    });
  }
}

export default async function getAllUser(req, res) {
  const { rows } = await findAllUsers();

  try {
    res.status(200).json({
      message: 'Success to GET users data!',
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error to GET users data!',
      error: error.message,
    });
  }
}
