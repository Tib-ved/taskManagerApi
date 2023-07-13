const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = express.Router();
const tasks = require('./routes/tasks');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(routes);
app.use(bodyParser.json());

const PORT = 3000;

routes.get('/', (req, res) => {
    res.status(200).send("Welcome to Taskmanager API");
});

routes.use('/tasks', tasks);

app.listen(PORT, (err) =>{
    if(!err){
        console.log("Server is started");
    }
    else{
        console.log("!!!! ERROR !!!!");
    }
});