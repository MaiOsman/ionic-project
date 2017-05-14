angular.module('chat app').controller('chat',function($scope,$timeout){
  socket.emit("chat");
    console.log($scope.message);
  // var $scope.userMessages
  socket.on('all_messages',function(msgs){
    console.log(msgs);
    $timeout(function(){
      console.log(msgs);
        $scope.userMessages = msgs;
    })
  })

  $scope.send = function(){
    console.log("hello from send function " , $scope.message);
    console.log($scope.message);
    var userMsg = {}
    userMsg.username = localStorage.getItem("username");
    userMsg.message = $scope.message;
    console.log(userMsg);
    socket.emit("send",userMsg);

    // $scope.message = '';
  }

  socket.on('send',function(userMsg){
    $timeout(function(){
      console.log(userMsg);
    })
  })
})
