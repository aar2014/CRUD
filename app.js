
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , inventory = require('./routes/inventory')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.use(function(req,res,next){
    res.locals.userValue = null;
    next();
});

app.get('/', routes.index);

//app.get('/',function(req,res){
//    res.render('index',{
//        title : 'Inventory Form',
//    });
//    console.log('user accessing Home page');
//});

app.get('/users', user.list);

app.get('/inventory', inventory.list);

app.post('/inventory/add',function(req,res){
    var inventory = {    
        name : req.body.invName,
        type : req.body.invType,
        count : req.body.invCount,
        area : req.body.invArea,
        shelfNum : req.body.invShelfNum
    };
    
    console.log(inventory);
    
    res.render('index', {
        userValue : inventory,
        title : 'Inventory Form'
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
