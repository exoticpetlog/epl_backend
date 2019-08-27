exports.up = function(knex) {
  return knex.schema.createTable("history_items", table => {
    table
      .integer("history_id")
      .unsigned()
      .index();
    table
      .foreign("history_id")
      .references("history.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("items_id")
      .unsigned()
      .index();
    table
      .foreign("items_id")
      .references("items.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("quantity").unsigned();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("history_items");
};
