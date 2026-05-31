/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('check_up', {
    check_up_id: {
      type: 'integer',
      primaryKey: true,
      sequenceGenerated: { precedence: 'ALWAYS' },
    },
    cholesterol: { type: 'decimal' },
    creatinin: { type: 'decimal' },
    fbs: { type: 'decimal' },
    rbs: { type: 'decimal' },
    hgb: { type: 'decimal' },
    lymfosit: { type: 'decimal' },
    mch: { type: 'decimal' },
    mchc: { type: 'decimal' },
    mcv: { type: 'decimal' },
    ureum: { type: 'decimal' },
    wbc: { type: 'decimal' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users(user_id)',
      onDelete: 'CASCADE',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('check_up');
};
