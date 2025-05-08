const syncService = require("../services/syncService");

const sendResponse = (res, data, statusCode = 200) => {
    res.status(statusCode).json({
        status: "success",
        data,
    });
};

const createSyncEvent = async (req, res, next) => {
    try {
        const syncEvent = await syncService.createSyncEvent(req.body);
        sendResponse(res, { syncEvent }, 201);
    } catch (error) {
        next(error);
    }
};

const getSyncHistory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { limit, skip } = req.query;

        const syncHistory = await syncService.getSyncHistory(id, {
            limit: parseInt(limit) || 100,
            skip: parseInt(skip) || 0,
        });

        sendResponse(res, { syncHistory });
    } catch (error) {
        next(error);
    }
};

const getDevicesWithRepeatedFailures = async (req, res, next) => {
    try {
        const { threshold } = req.query;
        const failureThreshold = parseInt(threshold) || 3;

        const devices = await syncService.getDevicesWithRepeatedFailures(failureThreshold);

        sendResponse(res, { devices });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSyncEvent,
    getSyncHistory,
    getDevicesWithRepeatedFailures,
};
