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
  pgm.createTable('refresh_tokens', {
    token_id: {
      type: 'integer',
      primaryKey: true,
      sequenceGenerated: { precedence: 'ALWAYS' },
    },
    token: {
      type: 'text',
      notNull: true,
    },
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users(user_id)',
      onDelete: 'CASCADE',
    },
    expires_at: {
      type: 'timestamp',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('refresh_tokens');
};
