exports.up = function(knex) {
  return knex.schema.createTable("animals", table => {
    table.increments("id");
    table.integer("species_id").unsigned();
    // ^^ force index ?  or not needed? .. leave out for now...
    table
      .foreign("species_id")
      .references("species.id")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");
    table
      .integer("org_id")
      .unsigned()
      .index();
    table
      .foreign("org_id")
      .references("orgs.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("description");
    table.text("notes");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("animals");
};
