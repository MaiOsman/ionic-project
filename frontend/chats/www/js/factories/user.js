angular.module('chat app').factory('User',function($http,$q){

  return {
      checkName: function(username){
        var def = $q.defer();
          $http({
            url:'http://localhost:3000/api/checkname',
            method:'POST',
            data : username
        }).then(function(res){
            if(res.data.status == 1){
                 def.resolve(res. data.status)
                 console.log(res.data.status);
            }else{
                 def.reject('there is no data')
            }
        },function(err){
            //  def.reject(err)
            //  return err
            })
          return def.promise;
      },

      signup: function(user){
        var def = $q.defer();

          $http({
            url:'http://localhost:3000/api/singup',
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
              url:'http://localhost:3000/api/login',
              method:'POST',
              data : user
          }).then(function(res){
// console.log(res.data.status);
              if(res.data.status){
                console.log("from true",res.data.status);
                   def.resolve(res.data.status)
                  //  console.log("factory"+res.data.status);
              }else{
                console.log("from zft",res.data.status);
                def.reject('there is no data')
              }
          },function(err){
              //  def.reject(err)
              })
            return def.promise;
      }
  }

})
