exports.up = function(knex) {
  return knex.schema.createTable("animals_categories", table => {
    table.integer("animal_id").unsigned();
    table.foreign("animal_id").references("animals.id");
    table.integer("category_id").unsigned();
    table.foreign("category_id").references("categories.id");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("animals_categories");
};
