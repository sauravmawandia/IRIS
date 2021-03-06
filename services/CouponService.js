var restify = require('restify');


var server = restify.createServer({
  name: 'CouponService',
});

//

server.use(restify.bodyParser({ mapParams: false}));
// end point for creating Coupon for Coupon Service
server.post('/createcoupon',function(request, response, next){
	response.send({
		couponInstanceID : Math.ceil(Math.random()*100000000),
		barcodeNumber: '995043556856'+Math.ceil(Math.random()*10000000000)
	});
	
	return next();

});
server.post('/cancelcoupon',function(request, response, next){
	response.send(200,"Cancelled the Coupon");
	
	return next();

});



server.listen(443, function(){
 console.log('server listening on port 443');
});