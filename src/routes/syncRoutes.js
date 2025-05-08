const express = require("express");
const syncController = require("../controllers/syncController");

const router = express.Router();

// POST /api/sync-event
router.post("/sync-event", syncController.createSyncEvent);

// GET /api/device/:id/sync-history
router.get("/device/:id/sync-history", syncController.getSyncHistory);

// GET /api/devices/repeated-failures
router.get("/devices/repeated-failures", syncController.getDevicesWithRepeatedFailures);

module.exports = router;
