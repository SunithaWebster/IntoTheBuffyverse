const express = require("express");
const router = express.Router();

const ZoomPageController = require("../controllers/zoompage");

router.get("/", ZoomPageController.Index);
router.get("/about", ZoomPageController.About);

module.exports = router;
