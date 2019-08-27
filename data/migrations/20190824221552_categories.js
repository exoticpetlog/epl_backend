exports.up = function(knex) {
  return knex.schema.createTable("categories", table => {
    table.increments("id");
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
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("categories");
};
