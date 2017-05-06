angular.module("chat app").controller('signup',function($scope,User,$state){

$scope.user={}
$scope.signup = function(){
 // validation conditions

 // request from server
    User.checkName($scope.user.username).then(function(data){
          if(data == 1){
              User.signup($scope.user).then(function(data){
                  if (data == 1) {
                    localStorage.setItem("username", $scope.user.username);
                    $state.go('base.active');
                  }else {
                      alert("there is something error, please try again");
                  }
              },function(err){

              })
          }else {
              alert("this user is already found");
          }
    },function(err){
      console.log(err);
      	alert(err);
    })
}

})
