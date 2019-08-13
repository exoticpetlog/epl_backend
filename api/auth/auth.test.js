// require("dotenv").config();
// const request = require("supertest");
// const db = require("../../config/dbConfig.js");
// const server = require("../server.js");
// const axios = require("axios");

// beforeAll(async () => {
//   await db("users").truncate();
// });

// afterEach(async () => {
//   await db("users").truncate();
//   // ??? // ??? // ??? //
//   // -- adding await a timer between each test...
//   // othereise tests pass no matter what?  so odd...
//   // await new Promise((resolve, reject) => {
//   //   setTimeout(() => {
//   //     resolve();
//   //   }, 500);
//   // });
// });

// describe("auth Routes", () => {
//   describe("register endpoint", () => {
//     describe("responds 400 + message if missing info", () => {
//       const username = "test1";
//       const password1 = "pass1";
//       const password2 = "pass2";
//       const email = "email";
//       test("if missing username", async () => {
//         // const res = await axios.post("http:/localhost:4000/auth/register", {
//         //   password1,
//         //   password2,
//         //   email
//         // });
//         // expect(res.status).toBe(300);
//         request(server)
//           .post("/auth/register")
//           .send({
//             password1,
//             password2,
//             email
//           })
//           .then(res => {
//             expect(res.status).toBe(400);
//             expect(res.body.message).not.toBeUndefined();
//           })
//           .catch(err => {
//             throw err;
//           });
//       });
//       // test("if missing password1", () => {
//       //   request(server)
//       //     .post("/auth/register")
//       //     .send({
//       //       username,
//       //       password2,
//       //       email
//       //     })
//       //     .then(res => {
//       //       expect(res.status).toBe(400);
//       //       expect(res.body.message).not.toBeUndefined();
//       //     });
//       // });
//       // test("if missing password2", () => {
//       //   request(server)
//       //     .post("/auth/register")
//       //     .send({
//       //       username,
//       //       password1,
//       //       email
//       //     })
//       //     .then(res => {
//       //       expect(res.status).toBe(400);
//       //       expect(res.body.message).not.toBeUndefined();
//       //     });
//       // });
//       test("if missing email", async () => {
//         request(server)
//           .post("auth/register")
//           .send({
//             username,
//             password1,
//             password2
//           })
//           .then(res1 => {
//             expect(res1.status).toBe(200);
//             expect(res1.body.message).toBeUndefined();
//           })
//           .catch(err => {
//             throw err;
//           });
//       });
//     });

//     // describe("successful info creates user", () => {
//     //   const username = "test1";
//     //   const password1 = "pass1";
//     //   const password2 = "pass1";
//     //   const email = "someEmail";

//     //   test("should respond 201 + token", () => {
//     //     request(server)
//     //       .post("auth/register")
//     //       .send({
//     //         username,
//     //         password1,
//     //         password2,
//     //         email
//     //       })
//     //       .then(res => {
//     //         expect(res.status).toBe(201);
//     //         epect(res.body.token).not.toBeUndefined();
//     //       });
//     //   });
//     //   test("should add to database", () => {
//     //     db("users")
//     //       .where({ username })
//     //       .first()
//     //       .then(user => {
//     //         expect(user.username).toEqual(username);
//     //       });
//     //   });
//     // });
//   });
//   // describe("login endpoint", () => {
//   //   describe("responds 400 + message for 'bad' info", () => {
//   //     const username = "test1";
//   //     const password = "pass1";
//   //     test("if missing username", () => {
//   //       request(server)
//   //         .post("/auth/login")
//   //         .send({ password })
//   //         .then(res => {
//   //           expect(res.status).toBe(400);
//   //           expect(res.body.message).not.toBeUndefined();
//   //         });
//   //     });
//   //     test("if missing password", () => {
//   //       request(server)
//   //         .post("/auth/login")
//   //         .send({ username })
//   //         .then(res => {
//   //           expect(res.status).toBe(400);
//   //           expect(res.body.message).not.toBeUndefined();
//   //         });
//   //     });
//   //   });
//   // });
// });
