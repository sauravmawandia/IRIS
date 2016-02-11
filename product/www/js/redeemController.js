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
	//alert(availablePoints);
	
	while(availablePoints > 1000){
		var value = Math.floor((availablePoints / 1000)) * 1000;
		//alert(value);
		tempArray.push({ "value" : value});
		availablePoints = availablePoints - 1000;
	}
	
	console.log(tempArray);
	$scope.data.denominations = tempArray;
	
	$scope.onDenominationChange = function(){
		//alert($scope.data.pointsToRedeem.value);
		$scope.data.voucherDenomination = $scope.data.pointsToRedeem.value / 100;
	}

	
	$scope.redeem = function() {
		debugger;
		alert($scope.data.pointsToRedeem.value)
		dataService.redeem($scope.data.clubCardNumber,$scope.data.pointsToRedeem.value)
					.then(
						function(data){
							alert('success from redeem controller');
							$state.go('barcode')  
						},
						function(error){
							alert('failure from redeem controller');
							//alert(error.status)
							var alertPopup = $ionicPopup.alert({
							title: 'Redemption Failed',
							template: 'Internal Server Error'
						});;
						}
					);
        };
		})