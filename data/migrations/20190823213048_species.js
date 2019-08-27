exports.up = function(knex) {
  return knex.schema.createTable("species", table => {
    table.increments("id");
    table.integer("org_id").unsigned();
    table
      .foreign("org_id")
      .references("orgs.id")
      .onDelete("CASCADE");
    // onUpdate ?
    // force index ?
    table.string("name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("species");
};
