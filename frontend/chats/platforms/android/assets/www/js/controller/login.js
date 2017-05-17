angular.module("chat app").controller('login',function($scope,User,$state,$rootScope){

$scope.login={}

$scope.login = function(valid){
if(valid){
  console.log($scope.login.username);

    User.login($scope.login.username,$scope.login.password).then(function(data){

        if(data == 1){
          // console.log("before",$scope.login.username);
            window.localStorage.setItem("username", $scope.login.username);
          var  name = localStorage.getItem("username");
            $rootScope.logedUser = name;
            socket.emit('join', $scope.login.username);
            $state.go('app.active');

        }else{
            console.log("notvalid");
            // console.log("after"+data);
            alert("Invalid user name or password");
        }
    })
  }
}

})
