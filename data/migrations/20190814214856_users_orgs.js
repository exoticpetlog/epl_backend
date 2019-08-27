exports.up = function(knex) {
  return knex.schema.createTable("users_orgs", table => {
    table.integer("user_id").unsigned();
    table
      .foreign("user_id")
      .references("users.id")
      .onDelete("CASCADE");
    // on update?
    // force index
    table.integer("org_id").unsigned();
    table
      .foreign("org_id")
      .references("orgs.id")
      .onDelete("CASCADE");
    // on update?
    // force index
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users_orgs");
};
