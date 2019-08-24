exports.up = function(knex) {
  return knex.schema.createTable("actions", table => {
    table.increments("id");
    table.integer("org_id").unsigned();
    table.foreign("org_id").references("orgs.id");
    table.string("name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("actions");
};
