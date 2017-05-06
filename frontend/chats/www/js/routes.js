angular.module('chats').config(function($stateProvider) {
  $stateProvider
  
  .state('home',{
    url:'/',
    templateUrl:"templates/home.html",
   
  })

  .state('login',{
    url:'/login',
    templateUrl:"templates/login.html",
     controller: "login"
   
  })

    .state('signup',{
    url:'/signup',
    templateUrl:"templates/signup.html",
    controller: "signup"
   
  })


    .state('base',{
    templateUrl:"templates/base.html",
    abstract:true,
    controller: "base"
    })


    .state('base.about',{
    url:'/about',
    views:{
      "pageContent":{
        templateUrl:"templates/about.html"
      }
    }
  })

     .state('base.chat',{
    url:'/chat',
    views:{
      "pageContent":{
        templateUrl:"templates/chat.html"
      }
    }
  })


      .state('base.active',{
    url:'/active',
    views:{
      "pageContent":{
        templateUrl:"templates/active.html"
      }
    }
  })


})
