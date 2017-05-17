angular.module('chat app').controller('logout',function($timeout,$state,$scope){
    $scope.username = localStorage.getItem('username');
    $scope.logout = function(){
      socket.emit('logout')
      socket.on('join',function(people){
        $timeout(function(){

            $scope.people = people;
            console.log("people",$scope.people );
        })

      })
      localStorage.removeItem('username')
      $state.go('home')
    }
});
