app.factory('dataService', function($http){
	
	var baseUrl = "localhost:8080/"; 
	
	var factory = {};
	
	//code to consume getpoints method from the service
	factory.getPoints = function(clubCardNumber){
		
		return $http({
					method: 'POST',
					url: 'http://ec2-52-49-218-105.eu-west-1.compute.amazonaws.com/getpoints',
					headers: {'Content-Type': 'application/json'},
					data: { 'clubCardNumber': clubCardNumber }
				}).then(
					function(response){ 
						return response.data 
					}
				)
	}
	
	//code to consume redeem method from the service
	factory.redeem = function(ccNumber,pointToRedeem){
		
		return $http({
					method: 'POST',
					url: 'http://ec2-52-49-218-105.eu-west-1.compute.amazonaws.com/redeempoints',
					headers: {'Content-Type': 'application/json'},
					data: { 'clubCardNumber': ccNumber,
							'pointsToRedeem': pointToRedeem}
				}).then(
					function(response){ 
						return response.data 
					}
				)
	}
	
	factory.cancel = function(trxID){
		
		return $http({
					method: 'POST',
					url: 'http://ec2-52-49-218-105.eu-west-1.compute.amazonaws.com/cancelcoupon',
					headers: {'Content-Type': 'application/json'},
					data: { 'transactionID': trxID}
				}).then(
					function(response){ 
						return response.data 
					}
				)
	}
	
    var mem = {};
	//method for sharing of data between controllers
	factory.store = function (key, value){
		mem[key] = value;
	}
	
	factory.get = function (key){
		return mem[key];
	}
    
	return factory;
});