// nodeBackend/routes/videoRoutes.js

const express = require("express");
const router = express.Router();
const isAuthorized = require("../middleware/isAuthorized");

const {
  addResult,
  deleteResult,
  updateResult,
  addfav,
} = require("../controllers/resultController");

router.post("/addResult", isAuthorized, addResult);
router.delete("/deleteResult", isAuthorized, deleteResult);
router.put("/updateResult", isAuthorized, updateResult);
router.put("/addfav", isAuthorized, addfav);

module.exports = router;
