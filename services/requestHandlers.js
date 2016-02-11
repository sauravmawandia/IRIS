var db = require('./db.js');

// handler for getpoints 
exports.getPointsHandler = function (request, response, next) {
    try {
        console.log(request.body.clubcardNumber);

        // closure method used as a callback when data is fetched from mongo db
        function callback(result) {
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

        db.getPoints(request.body.clubcardNumber, callback);
    }
    catch (e) {
        console.log(e);
    }
}

// handler for redeem points 
exports.redeemPointsHandler = function (request, response, next) {

    try {

        //
    }
    catch (e) {
        console.log(JSON.stringify(e));
    }

}


