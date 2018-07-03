var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// just to show in the terminal
server.listen(80, function(){
    console.log('listening on *:80');
});

// it is like routing in laravel
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/news' , function (req , res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/chat' , function (req , res) {
    res.sendFile(__dirname + '/index.html');
});


// this is a special event fired when a user enters connects to your socket.io server
io.on('connection', function(socket){
    console.log('a user connected');

    // sending private message ( from the docs )
    socket.on('private message', function (from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    // homework ( telling others that a user just connected
    io.emit('user connected' , 'a new user just connected');

    // trying the docs
    io.emit('new' , {hello : 'world' } ) ;
    socket.on('my other event', function (data) {
        console.log(data);
    });


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
//
// var chat = io.of('/chat').on('connection' , function (socket) {
//
//     console.log('chat') ;
//     // every one will get this message ;
//     socket.emit('a message' , {that : 'only' , '/chat' : 'will get' });
//     chat.emit('a message' , {everyone : 'in' , '/chat' : 'will get'})
//
//
//
// });
//
// var news = io
//     .of('/news')
//     .on('connection', function (socket) {
//         console.log('news') ;
//
//         socket.emit('item', { news: 'item' });
//     });
