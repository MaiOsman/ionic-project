const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

//End of Connection With MongoDB

var messages=[];

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

//Socket Connection
var people = {};
// MongoClient.connect('mongodb://127.0.0.1:27017/chatdb', function (err, db) {
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
      io.sockets.emit('all_messages',messages)

  	});

    client.on("send",function(userMsg){
      console.log('send event fired');
      console.log(userMsg);
      messages.push(userMsg)
      io.sockets.emit("send" ,userMsg);
    })


  	client.on("logout", function(){
      console.log('user disconnected',client.id);
  		io.sockets.emit("update", people[client.id] + " has left the server.");
  		delete people[client.id];
  		io.sockets.emit("update-people", people);
  	});
  //  console.log(people);
  })

  // db.close();
// })
//End of Socket Connection



//Code Sara


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
////headers


//routing
app.get('/',function(request,response){
  response.sendFile(__dirname+'/index.html');
})

/////////////////signup ///////////////////////////
app.post('/api/signup',function(request,response){
  if(request.body.username && request.body.password && request.body.email,request.body.firstname,request.body.lastname){
//create chatdb in mongodb && check if there are fulfill or not
// console.log(request.body);
    database.collection('users').save(request.body,function(err,result) {
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
  console.log("7amada",request.body);
  database.collection('users').find({"username" : request.body.username}).toArray(function(err,users) {
    if(!err && users.length){
      console.log(users);
        response.send({status:1})
    }else{
      console.log("bt return zerrrrrrrrroooooooooooo");
      response.send({status:0})
    }

  })
})
///////////////////login////////////////
app.post('/api/login',function(request,response){
  console.log(request.body);
  if(request.body.username && request.body.password){
    database.collection('users').find({"username":request.body.username,"password":request.body.password}).toArray(function(err,users) {
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
// //socket
// io.on('connection',function(client){
//   console.log("connected", client.id);
//   client.emit('message',messages)
//   client.on('message',function(msg){
//     console.log(msg);
//     messages.push(msg)
//     client.broadcast.emit("message",messages)
//     client.emit("message",messages)
//   })
// })
//connecting to mongodb
var url='mongodb://127.0.0.1:27017/chatdb';
MongoClient.connect(url,function(err,db){
  database=db;
  if(!err){
    console.log("connect correctly to database");


  }else{
    console.log("error");
  }
// db.close();
})


//End of Code Sara


//listing
server.listen(3000,function(){
  console.log("server is working!");
})
