# PiSync Backend

A production-grade backend service for PiSync, a lightweight service that helps PiBook and PiBox devices sync offline learning data to the cloud when internet connectivity is available.

## Overview

PiSync Backend serves as the central system for:

-   Recording sync events from devices
-   Tracking sync history and performance
-   Identifying devices with sync failures
-   Providing robust APIs for sync data management

## Features

-   **Comprehensive API Endpoints**:

    -   `POST /sync-event`: Record a new sync event
    -   `GET /device/:id/sync-history`: View sync history for a specific device
    -   `GET /devices/repeated-failures`: Identify devices with repeated failures

-   **Production-Ready Architecture**:

    -   Modular and maintainable code structure
    -   Comprehensive error handling
    -   Rate limiting
    -   Security headers
    -   Database connection management

-   **Notification System**:
    -   Detects devices with 3 consecutive sync failures
    -   Triggers notifications (console logs in current implementation)

## Technology Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB
-   **Security**: Helmet, Express Rate Limit

## Installation

1. Clone the repository:

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/pisync

```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## Sync Event Format

```json
{
    "device_id": "device_12345",
    "timestamp": "2025-05-07T10:30:00Z",
    "total_files_synced": 42,
    "total_errors": 2,
    "internet_speed": 5.3
}
```

## Scaling Strategy

The system is designed with scalability in mind:

-   **Database Optimization**: Strategic indexing and schema design
-   **Horizontal Scaling**: Stateless architecture for easy replication
-   **Message Queue Integration**: Support for async processing (future enhancement)
-   **Caching**: Redis integration for frequently accessed data (future enhancement)

## Future Enhancements

-   Authentication and authorization
-   Advanced notifications (email, SMS, webhooks)
-   Real-time monitoring dashboard
-   Data aggregation and analytics
-   Message queue integration for async processing
-   Redis caching for performance optimization
