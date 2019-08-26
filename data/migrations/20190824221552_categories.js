exports.up = function(knex) {
  return knex.schema.createTable("categories", table => {
    table.increments("id");
    table.integer("org_id").unsigned();
    table
      .foreign("org_id")
      .references("orgs.id")
      .onDelete("CASCADE");
    table.string("name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("categories");
};
