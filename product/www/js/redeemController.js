app.controller('redeemController', function($scope, $ionicPopup, $state,dataService) {
	
	$scope.loading = false;
	$scope.data = {};
    $scope.data.pointsToRedeem = 0;
	
	var pointsData = dataService.get('pointsData')
	var availablePoints = pointsData.points;
	
	$scope.data.customerName = pointsData.customerName,
	$scope.data.clubCardPoints = pointsData.points,
	$scope.data.clubCardNumber= pointsData.clubCardNumber
	$scope.data.voucherDenomination = 0;
	var masterDenominations = [100,200,500,1000,2000,5000];
	var tempArray =[]
	
	//code for populating the dropdown menu for points to be redeemed
	var i = 0;
	
	while(i < masterDenominations.length && availablePoints >= masterDenominations[i]){		
		tempArray.push({ "value" : masterDenominations[i]});
		i++;
		
	}
	
	console.log(tempArray);
	$scope.data.denominations = tempArray;
	$scope.data.pointsToRedeem = tempArray[0];
	$scope.data.voucherDenomination = $scope.data.pointsToRedeem.value / 100
	//code to populate the voucher denomination field
	$scope.onDenominationChange = function(){
		$scope.data.voucherDenomination = $scope.data.pointsToRedeem.value / 100
		dataService.store('denomination',$scope.data.voucherDenomination)
		
	}

	// redeem method call from the front end of the application
	$scope.redeem = function() {
		if ($scope.data.clubCardPoints >= 100)
		{
			$scope.loading = true;
			dataService.redeem($scope.data.clubCardNumber,$scope.data.pointsToRedeem.value)
				.then(
					function(data){
						$scope.loading = false;
						dataService.store('voucherDetails',data)
						$state.go('barcode')  
					},
					function(error){
						$scope.loading = false;
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