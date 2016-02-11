// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.controller('loginController', function($scope, loginService, $ionicPopup, $state) {
    $scope.data = {};
    $scope.data.clubCardNumber = "";
    $scope.login = function() {
        //alert($scope.data.clubCardNumber);
        loginService.loginUser($scope.data.clubCardNumber).success(function(data) {
            $state.go('redeem');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Clubcard login failed!',
                template: 'Please enter valid clubcard!'
            });
        });
    }
})

app.controller('redeemController', function($scope, $ionicPopup, $state) {
    $scope.data = {};
    $scope.data.pointToRedeem = "0";
    $scope.redeem = function() {
		//write logic to call the post method
            $state.go('home');
		//also write a error message on popup screen for error in redemption of points
		}
	})
	
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('home', {
    url: "/home",
    templateUrl: "templates/homepage.html",
    controller: 'loginController'
  })
  
  .state('redeem', {
    url: "/redeem",
    templateUrl: "templates/redeempage.html",
	controller: "redeemController"
  })
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
 });

app.service('loginService', function($q) {
    return {
        loginUser: function(clubCardNumber) {
            //alert(clubCardNumber);
            var deferred = $q.defer();
            var promise = deferred.promise;
            if (clubCardNumber == 6666) {
                deferred.resolve('Welcome!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                //alert('success');
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                //alert('failure');
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
