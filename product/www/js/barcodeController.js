app.controller('barcodeController', function($scope, $ionicPopup, $state,dataService) {
$scope.data = {};
var voucherDetails=dataService.get('voucherDetails')
var denomination = dataService.get('denomination')
$scope.data.denomination = denomination;
var bcode = voucherDetails.smartBarcodeNumber;
var transactionid = voucherDetails.transactionID;

$scope.$on('$ionicView.enter', function(){
        var value = $("#barcodeValue").val(); 
        var settings = {
          output:"css",
          bgColor: "#FFFFFF",
          color: "#000000",
          barWidth:1,
          barHeight: 50,
          moduleSize: "5",
          posX: "10",
          posY: "20",
          addQuietZone: "false"
        };   
          $("#barcodeTarget").barcode(bcode, "code11",settings);
      })
	   $scope.cancel= function() {
dataService.cancel(transactionid)
.then(
function(data){
//alert('success from controller');
var alertPopup = $ionicPopup.alert({
title: 'Cancellation Request',
template: 'Your voucher is cancelled'})
$state.go('home')  
},
function(error){
var alertPopup = $ionicPopup.alert({
title: 'Cancellation Failed',
template: 'Voucher not found!'
});;
}
);
};
}
)