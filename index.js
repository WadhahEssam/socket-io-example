var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// it is like routing in laravel
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// this is a special event fired when a user enters connects to your socket.io server
io.on('connection', function(socket){
    console.log('a user connected');

    // homework ( telling others that a user just connected
    io.emit('user connected' , 'a new user just connected');



    // this is anther special even fired when a user disconnects from your socket.io server
    socket.on('disconnect' , function () {
        console.log('user disconnected') ;
    });

    // listening on all the sockets emitting to the event ( chat message )
    socket.on('chat message' , function ( msg ) {
        // emitting a broadcast that will be sent to every one including the sender
        io.emit('chat message', msg);
    });


});

// just to show in the terminal
http.listen(80, function(){
    console.log('listening on *:3060');
});