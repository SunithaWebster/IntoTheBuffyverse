const ZoomPageController = {
  Index: (req, res) => {
    res.render("zoompage", { title: "Into the Buffyverse~" });
  },

  About: (req, res) => {
    res.render("about", { title: "About", session: req.session });
  },
};

module.exports = ZoomPageController;
