const ZoomPageController = {
  Index: (req, res) => {
    res.render("zoompage/zoompage", { title: "Into the Buffyverse~" });
  },
  Test: (req, res) => {
    res.render("zoompage/test", { title: "Into the Buffyverse~" });
  },
};

module.exports = ZoomPageController;
