angular.module('chat app').controller('chat',function($scope,User,$timeout){
  socket.emit('chat');
  // var $scope.userMessages
  socket.on('all_messages',function(msgs){
    $timeout(function(){
        $scope.userMessages = msgs;
    })
  })

  $scope.send = function(){
    console.log($scope.message);
    var userMsg = {}
    userMsg.username = localStorage.getItem("username");
    userMsg.message = $scope.message;
    console.log(userMsg);
    socket.emit('send',userMsg);
    //$scope.message ='';
  }

  socket.on('send',function(userMsg){
    $timeout(function(){
        $scope.userMessages.push(userMsg);
    })
  })
})
