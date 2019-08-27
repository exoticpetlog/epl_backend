exports.up = function(knex) {
  return knex.schema.createTable("history", table => {
    table.increments("id");
    table
      .integer("animal_id")
      .unsigned()
      .index();
    table
      .foreign("animal_id")
      .references("animals.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("action_id").unsigned();
    table
      .foreign("action_id")
      .references("actions.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    // ^^ force index ?  or not needed? .. leave out for now...
    table.boolean("success").defaultTo(true);
    table.boolean("is_complete").defaultTo(true);
    // ^^ boolean index? partial index?
    table.integer("initiating_user").unsigned();
    table
      .foreign("initiating_user")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");
    // ^^ force index ?  or not needed? .. leave out for now...
    table.integer("closing_user").unsigned();
    table
      .foreign("closing_user")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");
    // ^^ force index ?  or not needed? .. leave out for now...
    table.integer("item_id").unsigned();
    table
      .foreign("item_id")
      .references("items.id")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");
    // ^^ force index ?  or not needed? .. leave out for now...
    table.integer("quantity").unsigned();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("history");
};
