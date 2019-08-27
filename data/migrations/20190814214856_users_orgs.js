exports.up = function(knex) {
  return knex.schema.createTable("users_orgs", table => {
    table
      .integer("user_id")
      .unsigned()
      .index();
    table
      .foreign("user_id")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("org_id")
      .unsigned()
      .index();
    table
      .foreign("org_id")
      .references("orgs.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users_orgs");
};
