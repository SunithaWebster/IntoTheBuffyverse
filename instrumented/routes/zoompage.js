const express = require("express");
const router = express.Router();

const ZoomPageController = require("../controllers/zoompage");

router.get("/", ZoomPageController.Index);
router.get("/about", ZoomPageController.About);
router.get("/roadmap", ZoomPageController.Roadmap);

module.exports = router;
