exports.up = function(knex) {
  return knex.schema.createTable("reminders", table => {
    table.increments("id");
    table.integer("animal_id").unsigned();
    table.foreign("animal_id").references("animals.id");
    table.integer("action_id").unsigned();
    table.foreign("action_id").references("actions.id");
    table.integer("last_occurance").unsigned();
    table.foreign("last_occurance").references("history.id");
    table.integer("frequency");
    table.date("next_due");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("reminders");
};
