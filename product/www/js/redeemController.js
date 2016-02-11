app.controller('redeemController', function($scope, $ionicPopup, $state) {
    $scope.data = {};
    $scope.data.pointToRedeem = "0";
	$scope.redeem = function() {
		//write logic to call the post method
            $state.go('home');
		//also write a error message on popup screen for error in redemption of points
		}
	})
