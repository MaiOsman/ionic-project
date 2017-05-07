angular.module("chat app").controller('login',function($scope,User,$state){

$scope.login={}

$scope.login = function(valid){
if(valid){
    localStorage.setItem("username", $scope.login.username);
    $state.go('app.active');
}
}


})
