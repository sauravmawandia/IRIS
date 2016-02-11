app.controller('redeemController', function($scope, $ionicPopup, $state,dataService) {
	debugger;
	$scope.data = {};
    $scope.data.pointToRedeem = 0;
	var pointsData = dataService.get('pointsData')
	var availablePoints = 0;
	$scope.data.customerName = pointsData.customerName,
	$scope.data.clubCardPoints = pointsData.points,
	$scope.data.clubCardNumber= pointsData.clubCardNumber
	availablePoints = $scope.data.pointToRedeem
	// $scope.redeem = function() {
		// //write logic to call the post method
            // $state.go('home');
		// //also write a error message on popup screen for error in redemption of points
		// }
	// })
    $scope.data.voucherDenomination = availablePoints/100
	
	$scope.redeem = function() {
		debugger;
		dataService.redeem($scope.data.clubCardNumber,$scope.data.pointToRedeem)
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