const express = require("express");
const router = express.Router();

const ZoomPageController = require("../controllers/zoompage");

router.get("/", ZoomPageController.Index);

module.exports = router;
