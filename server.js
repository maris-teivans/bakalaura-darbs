var express 	  = require('express');
var path 		  = require('path');
var bodyParser    = require('body-parser');
var favicon 	  = require('express-favicon');
var mongoose   	  = require('mongoose');
var cookieParser  = require('cookie-parser');

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app   = express();
var index = require('./routes/index');
var rooms = require('./routes/rooms');
var login = require('./routes/login');

var socketServer = require('./socket');
socketServer.start();

var db = require('./config/db');
mongoose.Promise = global.Promise;
mongoose.connect(db.url); 

var port = 8080;

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Set static folder
app.use(express.static(path.join(__dirname, 'client')));

app.use(favicon(__dirname + '/client/images/favicon.ico'));

app.use('/api', login);
app.use('/api', rooms);
app.use('/', index);

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/*app.listen(process.env.PORT, process.env.IP, function(){
	console.log('Server started on ' + process.env.PORT + ' port, ' + process.env.IP + ' IP...');
});*/
app.listen(port, function(){
    console.log('Server started on ' + port);
});