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
  pgm.createTable('profiles', {
    profile_id: {
      type: 'integer',
      primaryKey: true,
      sequenceGenerated: { precedence: 'ALWAYS' },
    },
    name: {
      type: 'varchar',
      notNull: true,
    },
    age: {
      type: 'integer',
      notNull: false,
    },
    gender: {
      type: 'integer',
      notNull: false,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    user_id: {
      type: 'integer',
      notNull: true,
      unique: true,
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
  pgm.dropTable('profiles');
};
