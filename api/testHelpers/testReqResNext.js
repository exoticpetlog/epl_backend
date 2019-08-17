module.exports = {
  Req: class Req {
    constructor(body = {}, headers = {}) {
      this.body = body;
      this.headers = headers;
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
  next: (error = null) => {
    console.log(error);
  }
};
