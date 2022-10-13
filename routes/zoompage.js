const express = require("express");
const router = express.Router();

const ZoomPageController = require("../controllers/zoompage");

router.get("/", ZoomPageController.Index);
router.get("/about", ZoomPageController.About);
router.get("/roadmap", ZoomPageController.Roadmap);
router.get("/character", ZoomPageController.Character);

module.exports = router;
