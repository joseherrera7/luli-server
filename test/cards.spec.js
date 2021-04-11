let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const url = "http://localhost:3000";

describe("Insert a country: ", () => {
  it("should insert a country", (done) => {
    chai
      .request(url)
      .post("/api/v1/cards")
      .send({ id: 0, country: "Croacia", year: 2017, days: 10 })
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
});
