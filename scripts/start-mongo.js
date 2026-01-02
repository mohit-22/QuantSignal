const { MongoMemoryServer } = require('mongodb-memory-server');

async function startMongoDB() {
  try {
    console.log('Starting MongoDB Memory Server...');
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    console.log('MongoDB Memory Server started at:', mongoUri);
    console.log('Use this URI in your .env.local:');
    console.log(`MONGODB_URI=${mongoUri}`);

    // Keep the server running
    process.on('SIGINT', async () => {
      console.log('Stopping MongoDB Memory Server...');
      await mongoServer.stop();
      process.exit(0);
    });

    // Keep the process alive
    setInterval(() => {}, 1000);
  } catch (error) {
    console.error('Failed to start MongoDB Memory Server:', error);
    process.exit(1);
  }
}

startMongoDB();
