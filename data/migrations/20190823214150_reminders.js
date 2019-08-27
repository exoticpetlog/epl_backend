exports.up = function(knex) {
  return knex.schema.createTable("reminders", table => {
    table.increments("id");
    table.integer("animal_id").unsigned();
    table
      .foreign("animal_id")
      .references("animals.id")
      .onDelete("CASCADE");
    // onUpdate ?
    // force index ?
    table.integer("action_id").unsigned();
    table
      .foreign("action_id")
      .references("actions.id")
      .onDelete("CASCADE");
    // onUpdate ?
    // force index ?
    table.integer("org_id").unsigned();
    table
      .foreign("org_id")
      .references("orgs.id")
      .onDelete("CASCADE");
    // onUpdate ?
    // force index ?
    table.integer("last_occurance").unsigned();
    table
      .foreign("last_occurance")
      .references("history.id")
      .onDelete("SET NULL");
    // onUpdate ?
    // force index ?
    table.integer("user_id").unsigned();
    table
      .foreign("user_id")
      .references("users.id")
      .onDelete("SET NULL");
    // onUpdate ?
    // force index ?
    table.integer("frequency");
    table.date("next_due");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("reminders");
};
