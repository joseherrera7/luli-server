var express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../public/javascripts/configs");

var router = express.Router();

const db = require("../db");
const dbName = "luliDB";
const collectionName = "users";

db.initialize(dbName, collectionName, function (dbCollection) {
  /* GET VERIFY. */
  /**
   * @openapi
   * /users:
   *   get:
   *     summary: Returns a JSON with verify true.
   *     description: Verify that the API is running
   *     responses:
   *       200:
   *         description: Returns a JSON with verify true.
   */
  router.get("/", function (req, res, next) {
    res.json({ verify: "true" });
  });

  /* POST LOGIN. */
  /**
   * @openapi
   * /users:
   *   post:
   *     summary: Login with the user
   *     description: Login with the specified user
   *     responses:
   *        200:
   *         description: Auth complete.
   *        500:
   *         description: Internal Error.
   *        401:
   *         description: No token provided.
   *
   */
  router.post("/", function (req, res, next) {
    dbCollection.findOne({ correo: req.body.correo }, (error, user) => {
      if (error) {
        res.status(500).json({ error: "Internal Error" });
        throw error;
      }
      if (user == null) {
        res.status(401).send({ auth: false, token: null });
      }
      console.log(req.body.contrasena);
      console.log(user);
      if (user) {
        console.log(req.body.contrasena);
        console.log(user.contrasena);
        var passwordIsValid = bcrypt.compareSync(
          req.body.contrasena,
          user.contrasena
        );
        console.log(passwordIsValid);
        if (passwordIsValid) {
          console.log("User and password is correct");
          var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400, // expires in 24 hours
          });
          res.status(201).json({ auth: true, token, correo: user.correo });
        } else {
          console.log("Credentials wrong");
          res.status(401).send({ auth: false, token: null });
        }
      }
    });
  });
  /* POST REGISTER. */
  /**
   * @openapi
   * /users/register:
   *   post:
   *     summary: register a new user
   *     description: register a new user
   *     responses:
   *        200:
   *         description: Register complete.
   *        500:
   *         description: Internal Error.
   *        401:
   *         description: No token provided.
   */
  router.post("/register", function (req, res, next) { 
    var hashedPassword = bcrypt.hashSync(req.body.contrasena, 8);
    let usuario = {
      correo: req.body.correo,
      contrasena: hashedPassword,
    };

    dbCollection.findOne({ correo: usuario.correo }, (error, user) => {
      if (error) {
        res.status(500).json({ error: "Internal Error" });
        throw error;
      } else if (user && user.correo == req.body.correo) {
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

  // add the middleware function
  router.use(function (user, req, res, next) {
    res.status(200).send(user);
  });
});

module.exports = router;
