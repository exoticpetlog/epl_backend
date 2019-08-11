const bcrypt = require("bcrypt");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex("users")
      .del()
      // .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
      .then(function() {
        // Inserts seed entries
        return knex("users").insert([
          {
            username: "test1",
            password: bcrypt.hashSync("testpass1", 8),
            email: "email@test.1"
          },
          {
            username: "test2",
            password: bcrypt.hashSync("testpass2", 8),
            email: "email@test.2"
          }
        ]);
      })
  );
};
