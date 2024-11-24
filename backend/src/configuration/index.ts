export const DATA_BASE_CONFIGURATION = {
  mongoConnectionString:
    process.env.MONGO_CONNECTION_URL || 'mongodb://localhost:27017',
};
