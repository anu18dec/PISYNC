const mongoose = require("mongoose");

const syncEventSchema = new mongoose.Schema(
    {
        device_id: {
            type: String,
            required: true,
            index: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
            index: true,
        },
        total_files_synced: {
            type: Number,
            required: true,
            min: 0,
        },
        total_errors: {
            type: Number,
            required: true,
            min: 0,
        },
        internet_speed: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
        collection: "sync_events",
    }
);

syncEventSchema.index({ device_id: 1, timestamp: -1 });

syncEventSchema.methods.hasErrors = function () {
    return this.total_errors > 0;
};

const SyncEvent = mongoose.model("SyncEvent", syncEventSchema);

module.exports = SyncEvent;
