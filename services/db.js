//Importing the required mongodb driver
var mongoClient = require('mongodb').MongoClient;

//MongoDB connection URL
var dbHost = 'mongodb://saurav:saurav@ds062438.mongolab.com:62438/ngc' //'mongodb://192.168.56.1:27017/NGC' 

//Name of the collections
var pointCollection = "points";
var transactionCollection = "transactions"
var triggerLookupCollection = "triggerLookup";

exports.getPoints = function(clubCardNumber, callBack){
		
	// this is a asynchronous connection to the db 
	mongoClient.connect(dbHost, function(err, db){
		console.log('connecting db');
		if ( err ) throw err;
		 
		//Query Mongodb and iterate through the results
		result = db.collection(pointCollection)
		         .findOne({"clubCardNumber" : clubCardNumber}, function(err, doc){ 
					console.log(doc);
					callBack(doc);					
				 });
				 /*
				 .toArray(function(err, docs){
					for(index in docs){
						console.log(docs[index]);
						result = docs[index];
					}
				});
		 */ 
	});
}

exports.test = function(input){
	console.log(input);
	return input;
}

exports.getCouponTriggerData = function (clubCardNumber, pointsToRedeem, callback) {

    mongoClient.connect(dbHost, function (err, db) {

        console.log('connected db for redeem points');
        
        if (err) throw err;

        var voucherValue = parseInt(pointsToRedeem) / 100;
        
        // step 1 : looking up for triggerNumber, mailingNumber
        db.collection(triggerLookupCollection)
		  .findOne({ "voucherValue": voucherValue }, function (err, doc) {
		      //console.log("voucher value: " + JSON.stringify(doc));
		      callback(doc);
		  });
    });
}
