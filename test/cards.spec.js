let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const url = "http://localhost:2021";

//to test you have to change ids of the requests

describe("get all characters: ", () => {
  it("should get all characters", (done) => {
    chai
      .request(url)
      .get("/api/v1/cards")
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("get character with id 60519958abd5471774791a5f: ", () => {
  it("should get character with id 60519958abd5471774791a5f", (done) => {
    chai
      .request(url)
      .get("/api/v1/cards/60519958abd5471774791a5f")
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Insert a character: ", () => {
  it("should insert a character", (done) => {
    chai
      .request(url)
      .post("/api/v1/cards")
      .send({
        name: "Master Yoda XD 2",
        category: "Jedi",
        lightsaberColor: "green",
        species: "human",
        gender: "male",
        height: 60,
        weight: 50,
        description: "Wise and powerful, very little green guy...",
        img:
          "https://raw.githubusercontent.com/joseherrera7/star-wars/master/src/assets/images/yoda.jpg",
      })
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(201);
        done();
      });
  });
});

describe("update the lightsaberColor with id 60519958abd5471774791a5f: ", () => {
  it("should update the lightsaberColor", (done) => {
    chai
      .request(url)
      .put("/api/v1/cards/60519958abd5471774791a5f")
      .send({
        lightsaberColor: "green",
      })
      .end(function (err, res) {
        expect(res).to.have.status(204);
        done();
      });
  });
});

describe("delete the character with id 60519958abd5471774791a5f: ", () => {
  it("should delete the character with id 60519958abd5471774791a5f", (done) => {
    chai
      .request(url)
      .del("/api/v1/cards/60519958abd5471774791a5f")
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(204);
        done();
      });
  });
});
