"use strict";
{
class GuiHandler{
	constructor (allstatuses){
		this.allstatuses = allstatuses
	}
	set allstatuses(allstatuses){
		this._allstatuses = allstatuses
	}
	set deleteTaskCall(task){
		
	}
	set deleteTaskCall(task){
		
	}
	get allstatuses(){
		return this._allstatuses
	}
	
	showTask(task){
		const tasksDiv = document.getElementById('tasks')
		let stringOptions
		for(status in this.allstatuses){
			stringOptions += "<option value=\"" + this.allstatuses[status] +"\">" + this.allstatuses[status] + "</option>"
			
        }
		if(tasksDiv.getElementsByTagName('table').length == 0){
				
			var output = '';
			for(var i in task){
			//console.log(tasksDiv.getElementsByTagName('table').length + "if")
			
			output  += " <tbody><tr id=\"" + 
				task[i].id + "\">"+
                "<td>" + task[i].title + "</td>" +
                "<td>" + task[i].status + "</td>" +
                "<td>" +
                    "<select>" +
                       " <option value=\"0\" selected=\"\">&lt;Modify&gt;</option>" + stringOptions + 
                    "</select>" +
                "</td>" + 
                "<td><button type=\"button\">Remove</button></td>" 
			}
				tasksDiv.innerHTML = "<table><thead><tr><th>Task</th><th>Status</th></tr></thead> " + output + " </tr></tbody></table>";
		}else{
			const newTask = document.createElement("tr")
			newTask.setAttribute("id", task.id)
			newTask.innerHTML = "<td>" + task.title + "</td>" +
            "<td>" + task.status + "</td>" +
            "<td>" +
                "<select>" +
                   " <option value=\"0\" selected=\"\">&lt;Modify&gt;</option>" + stringOptions + 
                "</select>" +
            "</td>" + 
            "<td><button type=\"button\">Remove</button></td>"
            const list = tasksDiv
			tasksDiv.getElementsByTagName('tbody')[0].appendChild(nyTask)
		}
	}
	
	updateTask(task){
		
	}
	removeTask(id){
		
	}
	noTask(){
		
	}
}

const gui = new GuiHandler()
const statuses = ["WAITING","ACTIVE","DONE"]
const tasks = [
    {"id":1,"title":"Paint roof","status":"WAITING"},
    {"id":2,"title":"Clean floor","status":"DONE"},
    {"id":3,"title":"Wash windows","status":"ACTIVE"}
]

gui.allstatuses = statuses
tasks.forEach((task) => {gui.showTask(task)})





}