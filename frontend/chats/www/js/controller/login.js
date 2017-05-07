angular.module("chat app").controller('login',function($scope,User,$state){

$scope.login={}

$scope.login = function(valid){
if(valid){
  console.log($scope.login.username);
    // localStorage.setItem("username", $scope.login.username);
    // $state.go('app.active');
    // console.log($scope.login.username+" and " + $scope.login.password);
    User.login($scope.login.username,$scope.login.password).then(function(data){
      // console.log("first"+data);
        if(data == 1){
          // console.log("before"+data);
            localStorage.setItem("username", $scope.login.username);
            // socket.emit('join', $scope.login.username);
            $state.go('app.active');

        }else{
            console.log("notvalid");
            // console.log("after"+data);
        }
    })
  }
}

})
