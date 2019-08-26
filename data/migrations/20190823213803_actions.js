exports.up = function(knex) {
  return knex.schema.createTable("actions", table => {
    table.increments("id");
    table.integer("species_id").unsigned();
    table
      .foreign("species_id")
      .references("species.id")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.boolean("two_stage").defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("actions");
};
