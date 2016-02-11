// import required modules 
//var http = require('http');
var http = require('request');
var db = require('./db.js');

// handler for getpoints 
exports.getPointsHandler = function (request, response, next) {
    try {
        console.log(request.body.clubCardNumber);

        // closure method used as a callback when data is fetched from mongo db
        function sendResponse(result) {
            if (result != null) {
                response.send(200, {
                    clubCardNumber: result.clubCardNumber,
                    customerName: result.customerName,
                    points: result.points
                });
            }
            else
                response.send(401, "no records found");
            return next();
        }

        db.getPoints(request.body.clubCardNumber, sendResponse);
    }
    catch (e) {
        console.log(e);
    }
}

// handler for redeem points 
exports.redeemPointsHandler = function (request, response, next) {

    try {
        console.log("----------redeemPointsHandler----------");
        
        var data = request.body;
        
        console.log("posted data: " + JSON.stringify(data));

        // callback to send response to client 
        function sendResponse(result) {
            if (result != null) {
                response.send(200, result);
            }
            else
                response.send(401, "");
            return next();
        }

        // callback fuction once the coupon service returns data
        function recordTransaction(couponData) {
            // insert into transaction and update points
            
            db.updatePointsRedemption(data.clubCardNumber, data.pointsToRedeem, couponData, sendResponse);
        }

        // this is callback after the trigger data is retrieved 
        function createCoupon(couponTriggerData) {
            callCouponService(couponTriggerData, recordTransaction)
        }

        db.getCouponTriggerData(data.clubCardNumber, data.pointsToRedeem, createCoupon);
    }
    catch (e) {
        console.log(JSON.stringify(e));
    }

}


function callCouponService(couponTriggerData, callbackMethod) {
    console.log('call to coupon service');

    //Example POST method invocation 
    // import module 
    var Client = require('node-rest-client').Client;
    var client = new Client();

    // set content-type header and data as json in args parameter 
    var args = {
        data: couponTriggerData,
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://ec2-52-49-218-105.eu-west-1.compute.amazonaws.com:443/createcoupon", args, function (data, response) {
        //console.log(response.status);
        // parsed response body as js object 
        console.log("coupon data:" + JSON.stringify(data));
        callbackMethod(data);

    });
}