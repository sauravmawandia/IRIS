app.controller('redeemController', function($scope, $ionicPopup, $state,dataService) {
	debugger;
	$scope.data = {};
    $scope.data.pointsToRedeem = 0;
	
	var pointsData = dataService.get('pointsData')
	var availablePoints = pointsData.points;
	
	$scope.data.customerName = pointsData.customerName,
	$scope.data.clubCardPoints = pointsData.points,
	$scope.data.clubCardNumber= pointsData.clubCardNumber
		
	var tempArray = [];
	
	//code for populating the dropdown menu for points to be redeemed
	while(availablePoints > 1000){
		var value = Math.floor((availablePoints / 1000)) * 1000;
		tempArray.push({ "value" : value});
		availablePoints = availablePoints - 1000; 
	}
	
	console.log(tempArray);
	$scope.data.denominations = tempArray;
	
	//code to populate the voucher denomination field
	$scope.onDenominationChange = function(){
		$scope.data.voucherDenomination = $scope.data.pointsToRedeem.value / 100;
	}

	// redeem method call from the front end of the application
	$scope.redeem = function() {
		if ($scope.data.clubCardPoints > 1000)
		{
			dataService.redeem($scope.data.clubCardNumber,$scope.data.pointsToRedeem.value)
				.then(
					function(data){
						$state.go('barcode')  
					},
					function(error){
						var alertPopup = $ionicPopup.alert({
						title: 'Redemption Failed',
						template: 'Internal Server Error'
					});;
				});
		}
        else
		{
			var alertPopup = $ionicPopup.alert({
			title: 'Redemption Failed',
			template: 'Insufficient Points'
		})
	}
}
})