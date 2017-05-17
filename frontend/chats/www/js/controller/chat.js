angular.module('chat app').controller('chat',function($scope,$timeout){
$scope.msg={};
  socket.emit("chat");
  // var $scope.userMessages
  socket.on('all_messages',function(msgs){
    // console.log(msgs);
    $timeout(function(){
      console.log(msgs,"from db");
        $scope.userMessages = msgs;
    })
  })

  $scope.send = function($valid){

    console.log($valid);
    console.log("hello from send function " , $scope.msg.public);
    var userMsg = {}
    userMsg.username = localStorage.getItem("username");
    userMsg.message = $scope.msg.public;
    // console.log(userMsg);
    socket.emit("send",userMsg);

    $scope.msg.public = '';
  }

  socket.on('send',function(userMsg){
    $timeout(function(){
      $scope.userMessages.push(userMsg);
      console.log(userMsg,"from textarea");
    })
  })
})
