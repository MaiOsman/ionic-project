angular.module("chat app").controller('login',function($scope,User,$state){

$scope.login={}

$scope.login = function(valid){
if(valid){
    User.login($scope.login.username,$scope.login.password).then(function(data){
        if(data == 1){
            localStorage.setItem("username", $scope.login.username);
            socket.emit('join', $scope.login.username);
            $state.go('app.active');
        }else{

        }
    }

}
}


})
