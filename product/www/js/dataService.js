app.factory('dataService', function($http){
	
	var baseUrl = "localhost:8080/"; 
	
	var factory = {};
	
	factory.getPoints = function(clubCardNumber){
		
		//alert(clubCardNumber);
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
	
	factory.redeem = function(ccNumber,pointToRedeem){
		
		//alert(clubCardNumber);
		return $http({
					method: 'POST',
					url: 'http://localhost:8080/getpoints',
					headers: {'Content-Type': 'application/json'},
					data: { 'clubCardNumber': ccNumber,
							'pointsToRedeem': pointToRedeem}
				}).then(
					function(response){ 
						return response.data 
					}
				)
	}
	
    var mem = {};
 
	factory.store = function (key, value){
		mem[key] = value;
	}
	
	factory.get = function (key){
		return mem[key];
	}
    
	return factory;
});