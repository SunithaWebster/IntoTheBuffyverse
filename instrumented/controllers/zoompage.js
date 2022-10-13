const ZoomPageController = {
  Index: (req, res) => {
    res.render("zoompage", { title: "Into the Buffyverse~" });
  },

  About: (req, res) => {
    res.render("about", { title: "About", session: req.session });
  },

  Roadmap: (req, res) => {
    res.render("roadmap", { title: "Roadmap" });
  },
};

module.exports = ZoomPageController;
