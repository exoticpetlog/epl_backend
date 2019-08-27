exports.up = function(knex) {
  return knex.schema.createTable("items", table => {
    table.increments("id");
    table
      .integer("action_id")
      .unsigned()
      .index();
    table
      .foreign("action_id")
      .references("actions.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("items");
};
