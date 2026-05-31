import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { insertUser, findUserByEmail } from '../models/users.js';
import { insertProfile } from '../models/profiles.js';
import {
  insertRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
} from '../models/refreshTokens.js';

const SALT_ROUNDS = 10;

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  });
}

const mapJenisKelamin = (jk) => {
  if (jk === 0 || jk === 1) return jk;
  if (typeof jk === 'string') {
    const lower = jk.trim().toLowerCase();
    if (
      lower === 'laki-laki' ||
      lower === 'l' ||
      lower === 'male' ||
      lower === 'm' ||
      lower === '1'
    ) {
      return 1;
    }
    if (
      lower === 'perempuan' ||
      lower === 'p' ||
      lower === 'female' ||
      lower === 'f' ||
      lower === '0'
    ) {
      return 0;
    }
  }
  return null;
};

export async function register(req, res) {
  const { email, password, name, age, gender, umur_tahun, jenis_kelamin, umur, jk } = req.body;

  if (!name) {
    return res.status(400).json({
      message: 'Name is required for registration!',
    });
  }

  const activeAge =
    age !== undefined
      ? age
      : umur_tahun !== undefined
        ? umur_tahun
        : umur !== undefined
          ? umur
          : null;
  const ageVal = parseInt(activeAge);
  if (isNaN(ageVal) || ageVal <= 0) {
    return res.status(400).json({
      message: 'age is required and must be a valid positive number!',
    });
  }

  const rawGender =
    gender !== undefined ? gender : jenis_kelamin !== undefined ? jenis_kelamin : jk;
  const jkMapped = mapJenisKelamin(rawGender);
  if (jkMapped === null) {
    return res.status(400).json({
      message: 'gender is required and must be either 0/1 or Laki-laki/Perempuan!',
    });
  }

  try {
    // Check if email already exists
    const { rows: existingUsers } = await findUserByEmail(email);

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: 'Email already registered!',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert user
    const {
      rows: [user],
    } = await insertUser(email, hashedPassword);

    // Insert profile
    const {
      rows: [profile],
    } = await insertProfile(user.user_id, name, ageVal, jkMapped);

    // Generate tokens
    const tokenPayload = { user_id: user.user_id, email: user.email };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Save refresh token to DB
    const decoded = jwt.decode(refreshToken);
    const expiresAt = new Date(decoded.exp * 1000);
    await insertRefreshToken(refreshToken, user.user_id, expiresAt);

    res.status(201).json({
      message: 'User registered successfully!',
      data: {
        user_id: user.user_id,
        email: user.email,
        name: profile.name,
        age: profile.age,
        gender: profile.gender,
        created_at: user.created_at,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error registering user!',
      error: error.message,
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find user by email
    const {
      rows: [user],
    } = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password!',
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password!',
      });
    }

    // Generate tokens
    const tokenPayload = { user_id: user.user_id, email: user.email };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Save refresh token to DB
    const decoded = jwt.decode(refreshToken);
    const expiresAt = new Date(decoded.exp * 1000);
    await insertRefreshToken(refreshToken, user.user_id, expiresAt);

    res.status(200).json({
      message: 'Login successful!',
      data: {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        age: user.age,
        gender: user.gender,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in!',
      error: error.message,
    });
  }
}

export async function refresh(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      message: 'Refresh token is required!',
    });
  }

  try {
    // Check if token exists in DB
    const { rows } = await findRefreshToken(refreshToken);

    if (rows.length === 0) {
      return res.status(401).json({
        message: 'Refresh token not found or already revoked!',
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate new access token
    const accessToken = generateAccessToken({
      user_id: decoded.user_id,
      email: decoded.email,
    });

    res.status(200).json({
      message: 'Token refreshed successfully!',
      accessToken,
    });
  } catch (error) {
    // If token is expired/invalid, remove it from DB
    await deleteRefreshToken(refreshToken);

    res.status(401).json({
      message: 'Invalid or expired refresh token!',
    });
  }
}

export async function logout(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      message: 'Refresh token is required!',
    });
  }

  try {
    await deleteRefreshToken(refreshToken);

    res.status(200).json({
      message: 'Logged out successfully!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging out!',
      error: error.message,
    });
  }
}
