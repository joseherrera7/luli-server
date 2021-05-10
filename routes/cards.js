var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var ObjectId = require("mongodb").ObjectId;
var config = require("../public/javascripts/configs");

// << db setup >>
const db = require("../db");
const dbName = "luliDB";
const collectionName = "cards";

db.initialize(
  dbName,
  collectionName,
  function (dbCollection) {
    // successCallback
    // get all items
    dbCollection.find().toArray(function (err, result) {
      if (err) console.log(err);
      console.log(result);
    });

    // << db CRUD routes >>
    /* GET all cards . */
    /**
     * @openapi
     * /cards:
     *   get:
     *     summary: Get all cards
     *     description: Get all cards
     *     responses:
     *        200:
     *         description: All cards returned.
     *        500:
     *         description: Internal Error.
     *        401:
     *         description: No token provided.
     */
    router.get("/", function (req, res) {
      var token = req.headers["authorization"];
      if (!token)
        return res
          .status(401)
          .send({ auth: false, message: "No token provided." });

      console.log(token);
      jwt.verify(token, config.secret, function (err) {
        if (err) {
          console.log(res);
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token." });
        }
      });
      console.log(req.query.correo);
      try {
        dbCollection
          .find({ correo: req.query.correo })
          .toArray((error, result) => {
            if (error) console.log(error);
            res.status(200).send(result);
          });
      } catch (error) {}
    });

    /**
     * @openapi
     * /cards/{id}:
     *   get:
     *     summary: Get an card with an specific id
     *     description: register a new user
     *     responses:
     *        200:
     *         description: All cards returned.
     *        500:
     *         description: Internal Error.
     *        401:
     *         description: No token provided.
     *        404:
     *         description: Not found in DB.
     */
    router.get("/:id", function (req, res) {
      var token = req.headers["authorization"];
      if (!token)
        return res
          .status(401)
          .send({ auth: false, message: "No token provided." });

      console.log(token);
      jwt.verify(token, config.secret, function (err) {
        if (err) {
          console.log(res);
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token." });
        }
      });
      var _id = req.params.id;
      if (ObjectId.isValid(_id)) {
        dbCollection.findOne({ _id: new ObjectId(_id) }, (error, result) => {
          console.log("errorrrrrr:", error);
          console.log("result", result);
          if (error) {
            res.status(404).json({ error: "404 Not found" });
            console.log(error);
          }
          // return item
          res.status(200).json(result);
        });
      } else {
        res.status(404).json({ error: "404 Not found" });
      }

      //   if (character) {
      //     res.status(200).json(character);
      //   } else {
      //     res.status(404).json({ error: "404 Not found" });
      //   }
    });

    // POST card

    /**
     * @openapi
     * /cards:
     *   post:
     *     summary: Post a new card
     *     description: Post a new card
     *     responses:
     *        201:
     *         description: Modify completed.
     *        500:
     *         description: Internal Error.
     *        401:
     *         description: No token provided.
     *
     */
    router.post("/", function (req, res) {
      var token = req.headers["authorization"];
      if (!token)
        return res
          .status(401)
          .send({ auth: false, message: "No token provided." });

      console.log(token);
      jwt.verify(token, config.secret, function (err) {
        if (err) {
          console.log(res);
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token." });
        }
      });
      const item = req.body;
      dbCollection.insertOne(item, (error) => {
        // callback of insertOne
        if (error) console.log(error);
        // return updated list
        dbCollection.find().toArray((_error, _result) => {
          // callback of find
          if (_error) console.log(error);
          res.status(201).json(_result);
        });
      });

      //   if (utils.setElement(character)) {
      //     res.status(201).json({ message: "Se insertó correctamente" });
      //   } else {
      //     res.json({ message: "No se insertó." });
      //   }
    });

    // PUT card by ID
     /**
     * @openapi
     * /cards:
     *   put:
     *     summary: Modify a card
     *     description: Modify a card
     *     responses:
     *        204:
     *         description: Modify completed.
     *        500:
     *         description: Internal Error.
     *        401:
     *         description: No token provided.
     *        404:
     *         description: Not found.
     *
     */
    router.put("/:id", function (req, res) {
      var token = req.headers["authorization"];
      if (!token)
        return res
          .status(401)
          .send({ auth: false, message: "No token provided." });

      console.log(token);
      jwt.verify(token, config.secret, function (err) {
        if (err) {
          console.log(res);
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token." });
        }
      });
      const itemId = req.params.id;
      const item = req.body;
      console.log("Editing item: ", itemId, " to be ", item);
      if (ObjectId.isValid(itemId)) {
        dbCollection.updateOne(
          { _id: new ObjectId(itemId) },
          { $set: item },
          (error, result) => {
            if (error) {
              res.status(404).json({ message: "No se actualizó" });
              console.log(error);
            }
            console.log("resultado de put", result);
            res.status(204).json({ message: "Se actualizo" });
          }
        );
      } else {
        res.status(404).json({ message: "No se actualizó" });
      }

      //   if (utils.putElement(id, patch)) {
      //     res.status(204).json({ message: "Se actualizó correctamente" });
      //   } else {
      //     res.status(404).json({ message: "No se actualizó" });
      //   }
    });

    // GET card
         /**
     * @openapi
     * /cards:
     *   put:
     *     summary: Delete a card
     *     description: Delete a card
     *     responses:
     *        204:
     *         description: Delete completed.
     *        500:
     *         description: Internal Error.
     *        401:
     *         description: No token provided.
     *        404:
     *         description: Not found.
     *
     */
    router.delete("/:id", function (req, res) {
      var token = req.headers["authorization"];
      if (!token)
        return res
          .status(401)
          .send({ auth: false, message: "No token provided." });

      console.log(token);
      jwt.verify(token, config.secret, function (err) {
        if (err) {
          console.log(res);
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token." });
        }
      });
      const itemId = req.params.id;
      console.log("Delete item with id: ", itemId);

      if (ObjectId.isValid(itemId)) {
        dbCollection.deleteOne({ _id: new ObjectId(itemId) }, function (error) {
          if (error) console.log(error);
          // send back entire updated list after successful request

          res.status(204).json({ message: "Se eliminó correctamente" });
        });
      } else {
        res.status(404).json({ message: "No se eliminó" });
      }

      //   if (utils.deleteElement(id, patch)) {
      //     res.status(204).json({ message: "Se actualizó correctamente" });
      //   } else {
      //     res.status(404).json({ message: "No se actualizó" });
      //   }
    });
  },
  function (err) {
    // failureCallback
    throw err;
  }
);

module.exports = router;
