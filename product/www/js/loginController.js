app.controller('loginController', function($scope, $ionicPopup, $state, dataService) {
    $scope.data = {};
    //$scope.data.clubCardNumber = "";
    $scope.login = function() {
		
		dataService.getPoints($scope.data.clubCardNumber)
					.then(
						function(data){
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