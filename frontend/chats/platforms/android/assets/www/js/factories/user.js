angular.module('chat app').factory('User',function($http,$q){

  return {
      checkName: function(username){
        console.log("from factory",username);
        var user = {}
        user.username = username
        var def = $q.defer();
          $http({
            url:'http://172.16.3.28:3000/api/checkname',
            method:'POST',
            data : user
        }).then(function(res){
          console.log("from facory",res.data.status);
            if(res.data.status){
                 def.resolve(res.data.status)
                 console.log(res.data.status);
            }else{
              def.resolve(res.data.status)
            }
        },function(err){
            //  def.reject(err)
            //  return err
            })
          return def.promise;
      },

      signup: function(user){
        console.log("from signup factory",user);
        var def = $q.defer();

          $http({
            url:'http://172.16.3.28:3000/api/signup',
            method:'POST',
            data : user
        }).then(function(res){
            if(res.data.status){
                 def.resolve(res.data.status)
                 console.log(res.data.status);
            }else{
              def.reject('there is no data')
            }
        },function(err){
            //  def.reject(err)
            })
          return def.promise;
      },
      login : function(username,password){
            var def = $q.defer();
            var user = {}
            user.username = username
            user.password = password
            // console.log("fsctory enter");

            $http({
              url:'http://172.16.3.28:3000/api/login',
              method:'POST',
              data : user
          }).then(function(res){
// console.log(res.data.status);
              if(res.data.status){
                console.log("from true",res.data.status);

                   def.resolve(res.data.status)
                  //  console.log("factory"+res.data.status);
              }else{
                def.reject('there is no data')
              }
          },function(err){
              //  def.reject(err)
              })
            return def.promise;
      }
  }

})
