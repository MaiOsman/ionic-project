angular.module("chat app").controller('login',function($scope,User,$state){

$scope.user={}

$scope.login = function(){

    localStorage.setItem("username", $scope.login.username);
    $state.go('base.active');
}

})
