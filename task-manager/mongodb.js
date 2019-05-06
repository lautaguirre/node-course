const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect');
  }

  const db = client.db(databaseName);

  db.collection('tasks').findOne({ _id: new ObjectID('5ccf7806185cee3c5003f182') }, (error, result) => {
    if (error) {
      return console.log('Fail');
    }

    console.log(result);
  });

  db.collection('tasks').find({ completed: false }).toArray((error, res) => {
    if (error) {
      return console.log(error);
    }

    console.log(res);
  });
});
