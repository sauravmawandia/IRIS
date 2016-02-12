app.controller('loginController', function($scope, $ionicPopup, $state, dataService) {
    $scope.data = {};
	 
	$scope.loading = false;
	
	// login method call from the frontend HTML code for valid clubcard login
    $scope.login = function() {
		
		if($scope.data.clubCardNumber && $scope.data.clubCardNumber.length == 18)
		{
			$scope.loading = true;
			dataService.getPoints($scope.data.clubCardNumber)
					.then(
						function(data){
							$scope.loading = false;
							dataService.store('pointsData',data)
							$state.go('redeem')  
						},
						function(error){
							$scope.loading = false;
							var alertPopup = $ionicPopup.alert({
							title: 'Clubcard login failed!',
							template: 'Clubcard not found!'
						});;
					})
			}
		else
		{
			var alertPopup = $ionicPopup.alert({
			title: 'Invalid Clubcard',
			template: 'Enter valid clubcard number'
		})
        };
    }
})
	