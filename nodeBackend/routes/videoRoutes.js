// nodeBackend/routes/videoRoutes.js

const express = require("express");
const router = express.Router();

const { addResult, deleteResult,updateResult } = require("../controllers/resultController");

router.post("/addResult", addResult);
router.delete("/deleteResult", deleteResult);
router.put("/updateResult", updateResult);

module.exports = router;
