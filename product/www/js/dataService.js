app.factory('dataService', function($http){
	
	var baseUrl = "localhost:8080/"; 
	
	var factory = {};
	
	factory.getPoints = function(clubCardNumber){
		
		//alert(clubCardNumber);
		return $http({
					method: 'POST',
					url: 'http://localhost:8080/getpoints',
					headers: {'Content-Type': 'application/json'},
					data: { 'clubcardNumber': clubCardNumber }
				}).then(
					function(response){ 
						return response.data 
					},
					function(error){ 
						return error ;
					}
				)
	}
	
	return factory;
	
	
});