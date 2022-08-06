exports.up = function(knex) {
    return knex.schema
      .createTable('docs', function (table) {
        table.string('id').notNullable().primary();
        table.string('createdBy').notNullable();
        table.integer('createdAt');
        table.string('name').notNullable();
        table.string('collection').notNullable();
        table.string('data').notNullable();
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('docs');
  };