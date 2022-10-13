const ZoomPageController = {
  Index: (req, res) => {
    res.render("zoompage", { title: "Into the Buffyverse~" });
  },

  About: (req, res) => {
    res.render("about", { title: "About", session: req.session });
  },
  Test: (req, res) => {
    res.render("zoompage/test", { title: "Into the Buffyverse~" });
  },
};

module.exports = ZoomPageController;
