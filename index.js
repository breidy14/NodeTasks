const express = require('express');
const path = require('path');
const sequelize = require('sequelize');
const mysql2 = require('mysql2');
const boyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
//crea un app de express
const app = express();

//Middleware
const findUserMiddleware = require('./middlewares/find_user');
const authUser = require('./middlewares/auth_user');

//Routes
const indexRoutes = require('./routes/index_routes');
const sessionsRoutes = require('./routes/sessions_routes');
const projectsRoutes = require('./routes/projects_routes');
const tasksRoutes = require('./routes/tasks_routes');


//Config
//Donde Cargar archivos estaticos, 
//el /static es para poner que los recursos esten bajo ese prefijo, en dicho caso, por tanto que 
//agregar el prefijo al llamar al archivo
app.use('/static',express.static('public',{
    etag: false,
    maxAge:'5h' //despues que transcurra este tiempo, el navegador debe de borrar el cache, y hace una nueva copia
}));
app.use(boyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
//Habilitar pug
app.set('view engine', 'pug');
// Añadir la carpeta de las vitas
app.set('views', path.join(__dirname, './views'));

//Implentando Middleware
app.use(session({
    secret:['1234asdfre','12345qwerty'],
    saveUninitialized: false,
    resave: false
}));
app.use(findUserMiddleware);
app.use(authUser)

//Implentando Routes
app.use(indexRoutes);
app.use(sessionsRoutes);
app.use(projectsRoutes);
app.use(tasksRoutes);


app.listen(3000);