const taskRoutes = require('express').Router();
const taskList = require('../ListTask.json');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const validator = require('../helpers/validator');

taskRoutes.use(bodyParser.urlencoded({extended : false}));
taskRoutes.use(bodyParser.json());

taskRoutes.get('/', (req,res) =>{
    res.status(200);
    res.send(taskList);
});

taskRoutes.get('/:taskId', (req, res) => {
    let taskIdPassed = req.params.taskId;
    let result = taskList.filter(val => val.taskId == taskIdPassed);
    console.log(result);
    res.status(200).send(result);
});

taskRoutes.post('/', (req, res) => {
    const taskDetails = req.body;
    let writePath = path.join(__dirname,'..','ListTask.json');
    if(validator.validateTaskInfo(taskDetails,taskList).status){
        let tasListModified = taskList;
        taskListModified.push(taskDetails);
        fs.writeFileSync(writePath, JSON.stringify(taskListModified), {encoding: 'utf8', flag: 'w'});
        res.status(200).send("Task has been successfully added");
    }
    else{
        res.status(400).json(validator.validateTaskInfo(taskDetails, taskList));
    }
});

taskRoutes.put('/:taskId', (req, res) => {
    let updateTaskId = req.params.taskId;
    const taskDetails = req.body;
    let writePath = path.join(__dirname,'..','ListTask.json');
    let idFound = taskList.some(el => el.taskId == updateTaskId);
    if(!idFound){
        res.status(400).send("No such task found");
    } else{
        let taskListModified = taskList.filter(val => val.taskId!=updateTaskId);
        taskListModified.push(taskDetails);
        fs.writeFileSync(writePath, JSON.stringify(taskListModified), {encoding: 'utf8', flg: 'w'});
        res.status(200).send("task has been updated");
    }
});

taskRoutes.delete("/:taskId", (req, res) => {
    let taskIdPassed = req.params.taskId;
    let valueFound = taskList.some(el => el.taskId == taskIdPassed);
    if(valueFound){
        let taskListModified = taskList.filter(val => val.taskId!=taskIdPassed);
        let writePath = path.join(__dirname,'..','ListTask.json');
        fs.writeFileSync(writePath,JSON.stringify(taskListModified), {encoding: 'utf8', flag: 'w'});
        res.status(200).send("Task Deleted");
    } else {
        res.status(400).send("Task not found");
    }
});

module.exports = taskRoutes;