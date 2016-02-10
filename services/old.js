 

//Importing the required mongodb driver

var MongoClient = require('mongodb').MongoClient;

 

//MongoDB connection URL

var dbHost = 'mongodb://localhost:27017/IRIS';

 

//Name of the collection

var myCollection = "Points";

 

//Connecting to the Mongodb instance.

//Make sure your mongodb daemon mongod is running on port 27017 on localhost

MongoClient.connect(dbHost, function(err, db){

  if ( err ) throw err;

  //Query Mongodb and iterate through the results

  db.collection(myCollection).find({},{},{}).toArray(

    function(err, docs){

      for(index in docs){
        console.log(docs[index]);

      }

    }

  );

});
