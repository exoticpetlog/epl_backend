exports.up = function(knex) {
  return knex.schema.createTable("orgs", table => {
    table.increments("id");
    table
      .string("name")
      .notNullable()
      .unique();
    //  forces index ?? - yes
    table.integer("owner_id").unsigned();
    table
      .foreign("owner_id")
      .references("users.id")
      .onDelete("RESTRICT");
    //onUpdate ? cascade
    // force Index.
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("orgs");
};
