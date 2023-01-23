const express = require('express');
const { ExpressHandlebars } = require('express-handlebars');
const path = require('path');
const exphbs = require('express-ExpressHandlebars');
const { extname } = require('path');
const methodOverride  = require ('method-override');
//const { session } = require('passport');
const session = require('express-session');
//initiliazations
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join (app.get ('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set ('view engine', '.hbs');

//Middelwares
app.use(express.urlencoded ({extended: false}));
app.use(methodOverride('method'));
app.use (session ({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,
}))
//Global variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files

//server is listenning
app.listen(app.get('port'), ()=> {
    console.log('Serve on port', app.get('port'));
    })