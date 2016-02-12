// load the required modules 

var restify = require('restify');
var handlers = require('./requestHandlers.js');

// create the server 
var server = restify.createServer();

// configure app to use bodyParser()
// this will let us get the data from POST requests
server.use(restify.bodyParser( {mapParams: false} ));

// handler to run for all request prior to the end point
server.use(function(request, response, next){
	// do logging
    //console.log(request.body);

    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

	next(); // make sure we go to the next routes and don't stop here
});

//default route ( accessed at GET http://localhost:8080);
server.get('/', function (request, response, next) {
    response.send(200, "test response");
    return next(); // return the next handler to complete the request 
});


// add routes for the service end points 
server.post('/getpoints', handlers.getPointsHandler);

server.post('/redeempoints', handlers.redeemPointsHandler);
server.post('/cancelcoupon', handlers.cancelCouponHandler);

server.listen(8080, function(){
	console.log('the points server is up on port 8080');
})