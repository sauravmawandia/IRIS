// load the required modules 

var restify = require('restify');
var db = require('./db.js');

// create the server 
var server = restify.createServer();

// configure app to use bodyParser()
// this will let us get the data from POST requests
server.use(restify.bodyParser( {mapParams: false} ));

// handler to run for all request prior to the end point
server.use(function(request, response, next){
	// do logging
	//console.log(request.body);
	
	next(); // make sure we go to the next routes and don't stop here
});


// handler for getpoints 
var getPointsHandler = function(request, response, next){	
	try {
		console.log(request.body.clubcardNumber);
		
		function callback(result){
			response.send(200, result);
			return next();
		}
		
		db.getPoints(request.body.clubcardNumber, callback);		
	}
	catch(e){
		console.log(e);
	}	
}

// add routes for the service end points 

server.post('/getpoints', getPointsHandler);

//default route ( accessed at GET http://localhost:8080);
server.get('/', function(request, response, next){

	response.send( 200, "test response");
	return next(); // return the next handler to complete the request 

});

server.listen(8080, function(){
	console.log('the points server is up on port 8080');
})