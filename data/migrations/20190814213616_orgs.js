exports.up = function(knex) {
  return knex.schema.createTable("orgs", table => {
    table.increments("id");
    table
      .string("name")
      .notNullable()
      .unique();
    table
      .integer("owner_id")
      .unsigned()
      .index();
    table
      .foreign("owner_id")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("orgs");
};
