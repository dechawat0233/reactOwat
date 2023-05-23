const mongoose = require('mongoose');

const dbName = 'users';

async function checkDatabaseExists(dbName) {
  const dbList = await mongoose.connection.db.admin().listDatabases();
  return dbList.databases.some((db) => db.name === dbName);
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

async function createDatabaseIfNotExists() {
  const dbExists = await checkDatabaseExists(dbName);
  if (!dbExists) {
    await mongoose.connection.useDb(dbName);
    console.log(`Database "${dbName}" created!`);
  } else {
    console.log(`Database "${dbName}" already exists!`);
  }

  const collectionExists = await User.exists();
  if (!collectionExists) {
    const newData = {
      username: 'test3',
      password: 'test3',
    };
    await User.create(newData);
    console.log('New data inserted!');
  }
}

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB server!');
    createDatabaseIfNotExists()
      .then(() => {
        console.log('Process completed.');
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error('Error:', error);
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB server:', error);
  });
