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
  pgm.createType('risk_label', ['Low', 'Medium', 'High']);

  pgm.createTable('disease_predictions', {
    prediction_id: {
      type: 'integer',
      primaryKey: true,
      sequenceGenerated: { precedence: 'ALWAYS' },
    },
    check_up_id: {
      type: 'integer',
      notNull: true,
      references: 'check_up(check_up_id)',
      onDelete: 'CASCADE',
    },
    disease_id: {
      type: 'integer',
      notNull: true,
      references: 'diseases(disease_id)',
      onDelete: 'CASCADE',
    },
    probability: {
      type: 'decimal',
    },
    risk: {
      type: 'risk_label',
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
  pgm.dropTable('disease_predictions');
  pgm.dropType('risk_label');
};
