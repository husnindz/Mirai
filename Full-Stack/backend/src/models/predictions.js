import pool from '../config/database.js';

/**
 * Inserts a check-up record into the database.
 * @param {number} userId - ID of the user.
 * @param {object} data - Object containing check-up measurements.
 * @returns {Promise} - Postgres query result.
 */
export const insertCheckUp = (userId, data) => {
  const SQLQuery = `
    INSERT INTO check_up (
      user_id, cholesterol, creatinin, fbs, rbs, hgb, lymfosit, mch, mchc, mcv, ureum, wbc
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING check_up_id, cholesterol, creatinin, fbs, rbs, hgb, lymfosit, mch, mchc, mcv, ureum, wbc, created_at
  `;

  return pool.query(SQLQuery, [
    userId,
    data.cholesterol,
    data.creatinin,
    data.fbs,
    data.rbs,
    data.hgb,
    data.lymfosit,
    data.mch,
    data.mchc,
    data.mcv,
    data.ureum,
    data.wbc,
  ]);
};

/**
 * Inserts a single disease prediction.
 * @param {number} checkUpId - Reference ID to the check_up record.
 * @param {number} diseaseId - Reference ID to the disease.
 * @param {number} probability - Predicted probability (decimal).
 * @param {string} risk - Risk label ('Low', 'Medium', 'High').
 * @returns {Promise} - Postgres query result.
 */
export const insertDiseasePrediction = (checkUpId, diseaseId, probability, risk) => {
  const SQLQuery = `
    INSERT INTO disease_predictions (
      check_up_id, disease_id, probability, risk
    ) VALUES ($1, $2, $3, $4)
    RETURNING prediction_id, check_up_id, disease_id, probability, risk, created_at
  `;

  return pool.query(SQLQuery, [checkUpId, diseaseId, probability, risk]);
};

/**
 * Retrieves the check-up and prediction history of a user.
 * @param {number} userId - ID of the user.
 * @returns {Promise} - Postgres query result.
 */
export const findPredictionHistoryByUserId = (userId) => {
  const SQLQuery = `
    SELECT 
      c.check_up_id,
      c.created_at AS check_up_created_at,
      d.disease_name,
      dp.probability,
      dp.risk
    FROM check_up c
    LEFT JOIN disease_predictions dp ON c.check_up_id = dp.check_up_id
    LEFT JOIN diseases d ON dp.disease_id = d.disease_id
    WHERE c.user_id = $1
    ORDER BY c.created_at DESC, dp.disease_id ASC
  `;

  return pool.query(SQLQuery, [userId]);
};

/**
 * Retrieves a single check-up and its prediction history by check_up_id and userId.
 * @param {number} checkUpId - ID of the check-up.
 * @param {number} userId - ID of the user.
 * @returns {Promise} - Postgres query result.
 */
export const findPredictionHistoryById = (checkUpId, userId) => {
  const SQLQuery = `
    SELECT 
      c.check_up_id,
      c.cholesterol,
      c.creatinin,
      c.fbs,
      c.rbs,
      c.hgb,
      c.lymfosit,
      c.mch,
      c.mchc,
      c.mcv,
      c.ureum,
      c.wbc,
      c.created_at AS check_up_created_at,
      dp.prediction_id,
      dp.disease_id,
      d.disease_name,
      dp.probability,
      dp.risk,
      dp.created_at AS prediction_created_at
    FROM check_up c
    LEFT JOIN disease_predictions dp ON c.check_up_id = dp.check_up_id
    LEFT JOIN diseases d ON dp.disease_id = d.disease_id
    WHERE c.check_up_id = $1 AND c.user_id = $2
    ORDER BY dp.disease_id ASC
  `;

  return pool.query(SQLQuery, [checkUpId, userId]);
};
