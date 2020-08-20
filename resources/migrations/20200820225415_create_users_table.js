exports.up = function (knex) {
    return knex.schema.createTable("user", function (table) {
      table.increments().primary();
      table.string("forename").notNullable;
      table.string("surname").notNullable;
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("user");
  };
  