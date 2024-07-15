const express = require("express");
const router = express.Router();

router.post("/fooddata", (req, res) => {
  try {
    res.send([global.foodData, global.foodCategory]);
  } catch (err) {
    console.log(err.message);
    res.send("server Error");
  }
});

module.exports = router;