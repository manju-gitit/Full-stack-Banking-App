const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);

describe('GET /', () => {
  it("respond with Express", (done) => {
    request.get("/").expect("Express!", done);
  });
});
