const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

//End of Connection With MongoDB

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

//Socket Connection
var people = {};
MongoClient.connect('mongodb://127.0.0.1:27017/chatdb', function (err, db) {
  io.on('connection',function(client){
    console.log("connected", client.id);
    // people[client.id] = client.id;

    client.on("join", function(name){
  		people[client.id] = name;
  		client.emit("update", "You have connected to the server.");
  		io.sockets.emit("update", name + " has joined the server.")
  		io.sockets.emit("update-people", people);
  	});

  	client.on("chat", function(msg){
      var messages_collection = db.collection('messages');
      messages_collection.find().toArray(function(err, msgs) {
          console.log(msgs);
          io.sockets.emit('send',msgs)
          // closing the db
          db.close();
      });

  		//io.sockets.emit("chat", people[client.id], msg);
      io.sockets.on("send",function(msg){
        var messages_collection = db.collection('messages');
        messages_collection.insert({message:""+msg+""}, function(err, docs) {
            messages_collection.count(function(err, count) {
                console.log(format("count = %s", count));
            });
        });

      })
      io.sockets.emit("send" ,msg);


  	});

  	client.on("logout", function(){
      console.log('user disconnected',client.id);
  		io.sockets.emit("update", people[client.id] + " has left the server.");
  		delete people[client.id];
  		io.sockets.emit("update-people", people);
  	});
  //  console.log(people);
  })
  db.close();
})
//End of Socket Connection

//listing
server.listen(3000,function(){
  console.log("server is working!");
})
