const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect');
  }

  const db = client.db(databaseName);

  db.collection('tasks').deleteOne({
    description: 'Find my cat'
  }).then((res) => {
    console.log(res);
  }).catch((error) => {
    console.log(error);
  });
});
