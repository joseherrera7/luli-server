var express = require("express");
const createHttpError = require("http-errors");
var router = express.Router();
const utils = require("../public/javascripts/utils");
var ObjectId = require("mongodb").ObjectId;

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
      if (err) throw err;
      console.log(result);
    });

    // << db CRUD routes >>
    /* GET all cards . */
    router.get("/", function (req, res, next) {
      dbCollection.find().toArray((error, result) => {
        if (error) throw error;
        res.status(200).send(result);
      });
    });

    // GET card by ID
    router.get("/:id", function (req, res, next) {
      var _id = req.params.id;
      if (ObjectId.isValid(_id)) {
        dbCollection.findOne({ _id: new ObjectId(_id) }, (error, result) => {
          console.log("errorrrrrr:", error);
          console.log("result", result);
          if (error) {
            res.status(404).json({ error: "404 Not found" });
            throw error;
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
    router.post("/", function (req, res, next) {
      const item = req.body;
      dbCollection.insertOne(item, (error, result) => {
        // callback of insertOne
        if (error) throw error;
        // return updated list
        dbCollection.find().toArray((_error, _result) => {
          // callback of find
          if (_error) throw _error;
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
    router.put("/:id", function (req, res, next) {
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
              throw error;
            }
            console.log('resultado de put', result)
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
    router.delete("/:id", function (req, res, next) {
      const itemId = req.params.id;
      console.log("Delete item with id: ", itemId);

      if (ObjectId.isValid(itemId)) {
        dbCollection.deleteOne(
          { _id: new ObjectId(itemId) },
          function (error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            
            res.status(204).json({ message: "Se eliminó correctamente" });
            
          }
        );
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
