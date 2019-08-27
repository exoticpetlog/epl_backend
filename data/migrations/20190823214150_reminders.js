exports.up = function(knex) {
  return knex.schema.createTable("reminders", table => {
    table.increments("id");
    table.integer("animal_id").unsigned();
    table
      .foreign("animal_id")
      .references("animals.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    // ^^ force index ?  or not needed? .. leave out for now...
    table.integer("action_id").unsigned();
    table
      .foreign("action_id")
      .references("actions.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    // ^^ force index ?  or not needed? .. leave out for now...
    table
      .integer("org_id")
      .unsigned()
      .index();
    table
      .foreign("org_id")
      .references("orgs.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("last_occurance").unsigned();
    table
      .foreign("last_occurance")
      .references("history.id")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");
    // ^^ force index ?  or not needed? .. leave out for now...
    table.integer("user_id").unsigned();
    table
      .foreign("user_id")
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
    table.integer("quantity").unsigned();
    table.integer("frequency");
    table.date("next_due");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("reminders");
};
