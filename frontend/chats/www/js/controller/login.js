angular.module("chat app").controller('login',function($scope,User,$state){

$scope.user={}

$scope.login = function(){
    localStorage.setItem("username", $scope.user.username);
    $state.go('base.active');
}

})
