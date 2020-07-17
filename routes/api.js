const express = require("express");
const Ninja = require("../models/test");
const router = express.Router();

//get a list in return
router.get("/test", (req, res, next) => {
  Ninja.aggregate().near({
    near:{
      'type': "Point",
      'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
    },
     maxDistance: 100000, spherical: true ,distanceField:"dis"}
  ).then((ninja) => {
    res.send(ninja);
  });
});

//add a new data
router.post("/test", (req, res, next) => {
  Ninja.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

//update the existing data
router.put("/test/:id", (req, res, next) => {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Ninja.findOne({ _id: req.params.id }).then((ninja) => {
      res.send(ninja);
    });
    // to update the db and display it on output screen
  });
  //res.send({ type: "UPDATE" });
});

//delete a data from the database
router.delete("/test/:id", (req, res, next) => {
  Ninja.findByIdAndRemove({ _id: req.params.id }).then((ninja) => {
    res.send(ninja);
  });
  //res.send({ type: "DELETE" });
});

module.exports = router; //export these routes and use in index.js file
