var express = require("express");
var router = express.Router();
const db = require("../db");
const dbName = "luliDB";
const collectionName = "users";

db.initialize(dbName, collectionName, function (dbCollection) {
    /* GET VERIFY. */
  router.get("/", function (req, res, next) {
    res.json({ verify: "true" });
  });
    /* POST LOGIN. */
  router.post("/", function (req, res, next) {
    dbCollection.findOne({ usuario: req.body.correo }, (error, user) => {
      if (error) {
        res.status(500).json({ error: "Internal Error" });
        throw error;
      }
      if (user && user.contrasena === req.body.contrasena) {
        console.log("User and password is correct");
        res.status(201).json(user);
      } else if (user == null) {
        res.status(404).json({ error: "404 Not found" });
      } else {
        console.log("Credentials wrong");
        res.status(404).json({ data: "Login invalid" });
      }
    });
  });
    /* POST REGISTER. */
  router.post("/register", function (req, res, next) {
    let usuario = req.body
    dbCollection.findOne({ correo: usuario.correo }, (error, user) => {
      if (error) {
        res.status(500).json({ error: "Internal Error" });
        throw error;
      } else if (user && user.correo == req.body.correo){
        res.status(201).json({ correo: user.correo });
      } else {
        dbCollection.insertOne(usuario, (errorInsert, result) => {
          // callback of insertOne
          if (errorInsert) throw errorInsert;
          // return updated list
          dbCollection.find().toArray((_error, _result) => {
            // callback of find
            if (_error) throw _error;
            res.status(201).json(_result);
          });
        });
      }
    });
  });
});

module.exports = router;
