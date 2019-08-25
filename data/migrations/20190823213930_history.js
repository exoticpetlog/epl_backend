exports.up = function(knex) {
  return knex.schema.createTable("history", table => {
    table.increments("id");
    table.integer("animal_id").unsigned();
    table.foreign("animal_id").references("animals.id");
    table.integer("action_id").unsigned();
    table.foreign("action_id").references("actions.id");
    table.boolean("success").defaultTo(true);
    table.boolean("is_complete").defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("history");
};
