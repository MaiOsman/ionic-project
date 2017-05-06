angular.module("chat app").controller('signup',function($scope,User,$state){

$scope.user={}
$scope.signup = function(){
    localStorage.setItem("username", $scope.user.username);
    $state.go('base.active');
}

})
