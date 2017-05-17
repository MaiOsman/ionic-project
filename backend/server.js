
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient
    , format = require('util').format;
    var db;
    var messages=[];

//End of Connection With MongoDB

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

//Socket Connection
var people = {};

  console.log("connect correctly to database");
  io.on('connection',function(client){
    console.log("connected", client.id);
    // people[client.id] = client.id;

    client.on("join", function(name){
  		people[client.id] = name;
  		client.emit("update", "You have connected to the server.");
  		io.sockets.emit("update", name + " has joined the server.")
  		io.sockets.emit("join", people);
  	});


  	client.on("chat", function(){
      console.log("chat event fired");

      db.collection('messages').find().toArray(function(err,res){
     console.log(res);
     io.sockets.emit('all_messages',res);
      })


});

    client.on("send",function(userMsg){
      console.log("uder: ", userMsg.username , "mm :" , userMsg.message);
      console.log(userMsg,"check");
      var messages_collection = db.collection('messages');
      messages_collection.insert(userMsg, function(err, docs) {
      });

      io.sockets.emit("send" ,userMsg);
    });


  	client.on("logout", function(){

  		delete people[client.id];
      io.sockets.emit("join", people);
  	});
  //  console.log(people);
  })

//=============== API ====================
// var messages=[];
// var users=[];
var database;
// var Client;
//middlewares
app.all('*',function(req,res,next){
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET,POST');
res.header('Access-Control-Allow-Headers', 'Content-Type');
next();
});
app.use('/node_modules',express.static(__dirname+'/node_modules'));
app.use('/public',express.static(__dirname+'/public'));
app.use(bodyParser.json())

/////////////////signup ///////////////////////////
app.post('/api/signup',function(request,response){
  if(request.body.username && request.body.password && request.body.email,request.body.firstname,request.body.lastname){
//create chatdb in mongodb && check if there are fulfill or not
// console.log(request.body);
    db.collection('users').save(request.body,function(err,result) {
      if(!err){
          response.send({status:1})
      }else{
        // console.log(err);
          response.send({status:0})
      }
    });
  }
})
////////////checkName if it is in db or not ///////////
app.post('/api/checkname',function (request,response) {
  db.collection('users').find({"username" : request.body.username}).toArray(function(err,users) {
    if(!err && users.length){
      console.log(users);
        response.send({status:1})
    }else{
      console.log(" return zerrrrrrrrroooooooooooo");
      response.send({status:0})
    }

  })
})
///////////////////login////////////////
app.post('/api/login',function(request,response){
  console.log(request.body);
  if(request.body.username && request.body.password){
    db.collection('users').find({"username":request.body.username,"password":request.body.password}).toArray(function(err,users) {
      // console.log(users);
      if(!err && users.length){
        // users.push(user[0]);
        response.send({status:1});
        console.log();
      }else{
        response.send({status:0});
      }
    })
      // response.send({status:1})
  }
})
app.get('*',function(request,response){
  response.send(404);
})

var url='mongodb://127.0.0.1:27017/chatdb';
MongoClient.connect(url,function(err,database){
  db = database;
  if(!err){
    console.log("connect correctly to database");
//listing
server.listen(3000,function(){
  console.log("server is working!");
    })

  }else{
    console.log("error");
  }
// db.close();
})
