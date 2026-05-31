import Joi from 'joi';

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorDetails = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, ''),
      }));
      return res.status(400).json({
        message: 'Validation error',
        errors: errorDetails,
      });
    }

    req.body = value;
    next();
  };
};

/**
 * 1. Validation schema for Registration
 */
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email format is invalid',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required'
  }),
  name: Joi.string().trim().required().messages({
    'any.required': 'Name is required'
  }),
  // Supported legacy/alternative age variables
  age: Joi.number().integer().positive().optional(),
  umur_tahun: Joi.number().integer().positive().optional(),
  umur: Joi.number().integer().positive().optional(),
  
  // Supported legacy/alternative gender variables
  gender: Joi.any().optional(),
  jenis_kelamin: Joi.any().optional(),
  jk: Joi.any().optional(),
}).xor('age', 'umur_tahun', 'umur') // enforces exactly one age field
  .xor('gender', 'jenis_kelamin', 'jk'); // enforces exactly one gender field

/**
 * 2. Validation schema for Login
 */
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email format is invalid',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
});

/**
 * 3. Validation schema for Prediction Check-Up inputs (supporting floats and alternative names)
 */
export const checkUpSchema = Joi.object({
  gender: Joi.any().optional(),
  jenis_kelamin: Joi.any().optional(),
  jk: Joi.any().optional(),

  age: Joi.number().positive().optional(),
  umur_tahun: Joi.number().positive().optional(),
  umur: Joi.number().positive().optional(),

  // 11 check-up medical metrics (numbers supporting float/decimals)
  cholesterol_total: Joi.number().positive().optional(),
  cholesterol: Joi.number().positive().optional(),

  creatinine: Joi.number().positive().optional(),
  creatinin: Joi.number().positive().optional(),

  fbs: Joi.number().positive().required(),
  rbs: Joi.number().positive().required(),
  hgb: Joi.number().positive().required(),

  lymphocyte_percent: Joi.number().positive().optional(),
  lymfosit_persen: Joi.number().positive().optional(),
  lymfosit: Joi.number().positive().optional(),

  mch: Joi.number().positive().required(),
  mchc: Joi.number().positive().required(),
  mcv: Joi.number().positive().required(),

  urea: Joi.number().positive().optional(),
  ureum: Joi.number().positive().optional(),

  wbc: Joi.number().positive().required()
}).xor('gender', 'jenis_kelamin', 'jk')
  .xor('age', 'umur_tahun', 'umur')
  .xor('cholesterol_total', 'cholesterol')
  .xor('creatinine', 'creatinin')
  .xor('lymphocyte_percent', 'lymfosit_persen', 'lymfosit')
  .xor('urea', 'ureum');
