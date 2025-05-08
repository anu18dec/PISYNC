const SyncEvent = require("../models/syncEvent");

class SyncService {
    async createSyncEvent(eventData) {
        const syncEvent = new SyncEvent(eventData);
        await syncEvent.save();

        await this.checkRepeatedFailures(eventData.device_id);

        return syncEvent;
    }

    async getSyncHistory(deviceId, options = {}) {
        const limit = options.limit || 100;
        const skip = options.skip || 0;

        return SyncEvent.find({ device_id: deviceId }).sort({ timestamp: -1 }).limit(limit).skip(skip);
    }

    async getDevicesWithRepeatedFailures(failureThreshold = 3) {
        const result = await SyncEvent.aggregate([
            {
                $match: { total_errors: { $gt: 0 } },
            },
            {
                $group: {
                    _id: "$device_id",
                    failedSyncCount: { $sum: 1 },
                    lastFailure: { $max: "$timestamp" },
                },
            },
            {
                $match: { failedSyncCount: { $gte: failureThreshold } },
            },
            {
                $sort: { lastFailure: -1 },
            },
        ]);

        return result;
    }

    async checkRepeatedFailures(deviceId) {
        const recentSyncs = await SyncEvent.find({ device_id: deviceId }).sort({ timestamp: -1 }).limit(3);

        if (recentSyncs.length === 3 && recentSyncs.every((sync) => sync.total_errors > 0)) {
            console.log(`ALERT: Device ${deviceId} has failed to sync 3 times in a row`);
        }
    }
}

module.exports = new SyncService();
