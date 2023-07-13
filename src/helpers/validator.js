class validator {
    static validateTaskInfo(taskInfo,taskData) {
        if(!this.validateUniqueTaskId(taskInfo,taskData)) {
            return {
                "status" : false,
                "message" : 'Task id already in use'
            };
        }
        if(taskInfo.hasOwnProperty("taskId") && taskInfo.hasOwnProperty("title") && taskInfo.hasOwnProperty("description") && taskInfo.hasOwnProperty("flag")) {
            return {
                "status" : true,
                "message" : 'Task has been added'
            };
        }
        return {
            "status" : false,
            "message" : 'Data not sufficient to add task'
        };
    }
    static validateUniqueTaskId(taskInfo,taskData) {
        let valueFound = taskData.some(el => el.taskId === taskInfo.taskId);
        if(valueFound) return false;
        return true;
    }
}

module.exports = validator;