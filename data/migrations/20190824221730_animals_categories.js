exports.up = function(knex) {
  return knex.schema.createTable("animals_categories", table => {
    table
      .integer("animal_id")
      .unsigned()
      .index();
    table
      .foreign("animal_id")
      .references("animals.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("category_id")
      .unsigned()
      .index();
    table
      .foreign("category_id")
      .references("categories.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("animals_categories");
};
