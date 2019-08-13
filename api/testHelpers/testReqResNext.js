module.exports = {
  Req: class Req {
    constructor(body) {
      this.body = body;
    }
  },
  Res: class Res {
    constructor() {
      this.statusCode = 0;
      this.jsonSent = "";
    }
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    }
    json(data) {
      this.jsonSent = data;
    }
  },
  next: function() {}
};
// class Req {
//   constructor(body) {
//     this.body = body;
//   }
// }

// class Res {
//   constructor() {
//     this.statusCode = 0;
//     this.jsonSent = "";
//   }
//   status(statusCode) {
//     this.statusCode = statusCode;
//     return this;
//   }
//   json(data) {
//     this.jsonSent = data;
//   }
// }

// const next = () => {};
