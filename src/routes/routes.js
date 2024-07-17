const UrlController = require("../controller/urlController");
const express = require("express");

const router = express.Router();

const urlController = new UrlController();

router.post("/url",urlController.shortenUrl);
router.get("/:id",urlController.redirectToOrgUrl);
router.get("/analytics/:id",urlController.clickAnalytics);

module.exports = router;
