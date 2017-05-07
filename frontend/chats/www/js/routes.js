angular.module('chat app').config(function($stateProvider) {
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


    .state('app',{
    templateUrl:"templates/app.html",
    abstract:true,
    // controller: "app"
    })


    .state('app.about',{
    url:'/about',
    views:{
      "pageContent":{
        templateUrl:"templates/about.html"
      }
    }
  })

     .state('app.chat',{
    url:'/chat',
    views:{
      "pageContent":{
        templateUrl:"templates/chat.html"
      }
    }
  })


      .state('app.active',{
    url:'/active',
    views:{
      "pageContent":{
        templateUrl:"templates/active.html",
        // controller: "active"
      }
    }
  })


})
