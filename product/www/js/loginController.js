app.controller('loginController', function($scope, $ionicPopup, $state, dataService) {
    $scope.data = {};
	// login method call from the frontend HTML code for valid clubcard login
    $scope.login = function() {
		if($scope.data.clubCardNumber.length==18)
		{dataService.getPoints($scope.data.clubCardNumber)
					.then(
						function(data){
							dataService.store('pointsData',data)
							$state.go('redeem')  
						},
						function(error){
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
	