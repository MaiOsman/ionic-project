angular.module('chat app').factory('User',function($http,$q){

  return {
      checkName: function(username){
        var def = $q.defer;
          $http({
            url:'http://localhost:3000/api/checkname',
            method:'POST',
            data : username
        }).then(function(res){
            if(res.data.length){
                 def.resolve(res.status)
                 console.log(res)
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
        var def = $q.defer;

          $http({
            url:'http://localhost:3000/api/singup',
            method:'POST',
            data : user
        }).then(function(res){
            if(res.data.length){
                 def.resolve(res.status)
            }else{
              def.reject('there is no data')
            }
        },function(err){
            //  def.reject(err)
            })
          return def.promise;
      },

      login : function(userName,password){
            var def = $q.defer;
            var user = {}
            user.username = username
            user.password = password
            $http({
              url:'http://localhost:3000/api/login',
              method:'POST',
              data : user
          }).then(function(res){
              if(res.data.length){
                   def.resolve(res.status)
              }else{
                def.reject('there is no data')
              }
          },function(err){
              //  def.reject(err)
              // return err
              })
            return def.promise;
      }
  }

})
