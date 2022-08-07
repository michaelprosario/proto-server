exports.up = function(knex) {
    return knex.schema
      .createTable('docs', function (table) {
 
        table.string('collection').notNullable();
        table.string('data').notNullable();
        table.string('id').notNullable().primary();
        table.string('name').notNullable();
        table.string('tags');
        table.integer('createdAt');
        table.string('createdBy').notNullable();
        table.integer('updatedAt');
        table.string('updatedBy');
 
      });
  };

  exports.down = function(knex) {
    return knex.schema
      .dropTable('docs');
  };