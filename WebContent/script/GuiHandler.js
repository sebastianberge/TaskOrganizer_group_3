"use strict";

const gui = new GuiHandler()
const statuses = ["WAITING","ACTIVE","DONE"]
const tasks = [
    {"id":1,"title":"Paint roof","status":"WAITING"},
    {"id":2,"title":"Clean floor","status":"DONE"},
    {"id":3,"title":"Wash windows","status":"ACTIVE"}
]

gui.allstatuses = statuses
tasks.forEach((task) => {gui.showTask(task)})

// Display a new task at the the top of the viewed list. The id of task must not
// already exist in the view.
function showTask(task){
	
}

// Function for updating a task in the view
// Only after a successful response on a Ajax request should the view be updated
// through the functionality
function updateTask(){
	
}

// Function for removing a task in the view
// Only after a successful response on a Ajax request should the view be updated
// through the functionality
function removeTask(){
	
}


// Tells GuiHandler that the list of tasks are empty, e.g. when the database has
// no tasks.
function noTask(){
	
}

