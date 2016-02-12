var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    ObjectID = require('mongodb').ObjectID;

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
		//console.log('connecting db');
		if ( err ) throw err;
		 
		//Query Mongodb to get points for the clubcardNumber
		result = db.collection(pointCollection)
		         .findOne({"clubCardNumber" : clubCardNumber}, function(err, doc){ 
					console.log(doc);
					callBack(doc);					
				 });
				 
	});
}

exports.test = function(input){
	console.log(input);
	return input;
}

exports.getCouponTriggerData = function (clubCardNumber, pointsToRedeem, callback) {

    mongoClient.connect(dbHost, function (err, db) {

       // console.log('connected db for redeem points');
        
        if (err) throw err;

        var voucherValue = parseInt(pointsToRedeem) / 100;
        
        // step 1 : looking up for triggerNumber, mailingNumber
        db.collection(triggerLookupCollection)
		  .findOne({ "voucherValue": voucherValue }, function (err, doc) {
		      if (doc == null) throw new Error("invalid denomination");

		      //console.log("voucher value: " + JSON.stringify(doc));
		      callback(doc);
		  });
    });
}

exports.updatePointsRedemption = function (clubCardNumber, pointsRedeemed, couponData, callbackMethod) {

    mongoClient.connect(dbHost, function (err, db) {

       // console.log('connected db for redeem points');

        if (err) throw err;

        db.collection(pointCollection).findOne({"clubCardNumber" : clubCardNumber}, function (err, doc) {
            if(err) return;
            
            // redeem points only if pointsToRedeem < existing points
            if (doc.points > pointsRedeemed) {
                updateRedemption(clubCardNumber, pointsRedeemed, couponData, db, callbackMethod);
            }
            else {
                throw new Error("insufficient points");
            }
               
        });

    });
}

function updateRedemption(clubCardNumber, pointsRedeemed, couponData, db, callbackMethod) {

    var returnObj = {};
    // recording the transaction 
    db.collection(transactionCollection).insert({
        clubcardNumber: clubCardNumber,
        pointsRedeemed: pointsRedeemed,
        smartBarCodeNumber: couponData.barcodeNumber,
        couponInstanceID: couponData.couponInstanceID,
        timeStamp: Date(),
        status: 'redeemed'
    }, function (err, records) {
        if (err) throw err;

        returnObj.clubCardNumber = clubCardNumber;
        returnObj.transactionID = records["ops"][0]["_id"];
        returnObj.smartBarcodeNumber = couponData.barcodeNumber;


        console.log('inserted into transaction collection');

        // update the points for the clubcardNumber

        db.collection(pointCollection).update(
            { "clubCardNumber": clubCardNumber }, { $inc: { "points": -pointsRedeemed } }
            , function (err) {

                if (err) throw err;
                console.log('updated points ')

                // invoke the call back 
                callbackMethod(returnObj);
            }
        );
    });

}

exports.getTransactionDetails=function(transactionID,callBack ){
	// this is a asynchronous connection to the db 
	mongoClient.connect(dbHost, function(err, db){
		//console.log('connecting db');
		if ( err ) throw err;

		//Query Mongodb to get transaction details for the transactionID
		var obj_id = new ObjectID(transactionID);
		result = db.collection(transactionCollection)
		         .findOne({ _id: obj_id }, function (err, doc) {
		             if (doc == null)
                 throw new Error("TransactionID not found")
					//console.log(doc);
					callBack(doc);					
				 });
				 
	});
}

exports.revertPoints = function(transDetails,callBack) {
	// this is a asynchronous connection to the db 
	mongoClient.connect(dbHost, function(err, db){
		//console.log('connecting db');
		if ( err ) throw err;

        
        
        db.collection(pointCollection).update(
        { "clubCardNumber": transDetails.clubCardNumber }, { $inc: { "points": transDetails.pointsRedeemed} } 
            , function (err) {

                if (err) throw err;
                console.log('updated points ')

                // invoke the call back 
                callBack("added");
            });
        });

}