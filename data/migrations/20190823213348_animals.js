exports.up = function(knex) {
  return knex.schema.createTable("animals", table => {
    table.increments("id");
    table.integer("species_id").unsigned();
    table.foreign("species_id").references("species.id");
    table.integer("org_id").unsigned();
    table.foreign("org_id").references("orgs.id");
    table.string("name").notNullable();
    table.string("description");
    table.text("notes");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("animals");
};
