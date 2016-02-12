app.controller('loginController', function($scope, $ionicPopup, $state, dataService) {
    $scope.data = {};
	// login method call from the frontend HTML code for valid clubcard login
    $scope.login = function() {
		
		dataService.getPoints($scope.data.clubCardNumber)
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
						}
					);
        };
    })