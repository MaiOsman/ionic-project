angular.module('chat app').controller('active',function($scope,User,$timeout){


  socket.on('join',function(people){
    $timeout(function(){

        $scope.people = people;
        console.log( $scope.people );
    })

  })
})
