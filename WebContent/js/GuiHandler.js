"use strict";
{
	
class GuiHandler{
	
	constructor (allstatuses){
		this.allstatuses = allstatuses;
	// this.deleteTaskCallback = deleteTaskCallback;
	// this.newStatusCallback = newStatusCallback;
		}
	
	/*
	 * to set a list of all possible task state, i.e. the values that can be
	 * chosen with the HTML select elements.
	 */
	set allstatuses(allstatuses){
		this._allstatuses = allstatuses;
	}
	
	/*
	 * to set a list of all possible task state, i.e. the values that can be
	 * chosen with the HTML select elements.
	 */
	get allstatuses(){
		return this._allstatuses;
	}
	/*
	 * Setter that adds a callback to run when a Remove button is clicked.
	 */
	set deleteTaskCallback(id){
		console.log("User has approved the deletion of task with id " + id + ".");		
		console.log("Observer, task with id " + id + " is not removed from the view!")
		// this.removeTask(id);
	}
	
	
	/*
	 * Setter that adds a callback to run when an Modify select element is
	 * changed.
	 */
	set newStatusCallback(task){
		console.log("User has approved to change the status of task with id " + task.id + "to " + task.status);
		console.log("Observer, task with id " + task.id + "is not set to " + task.status + " in the view!");
		// this.updateTask(task);
	}
	
	
	
	
	/*
	 * Display a new task at the the top of the viewed list. The id of task must
	 * not already exist in the view.
	 */
	showTask(task){
		// ---------Solution for displaying nr of tasks for now----
		const messageDiv = document.getElementById('message');
		messageDiv.innerHTML = "Found " + task.id + " tasks";
		const tasksDiv = document.getElementById('tasks');
		// ---------------------------------------------------------
		let stringOptions;
		for(status in this.allstatuses){
			// Makes it so that the status of the task that is chosen is
			// disabled
			if(task.status == this.allstatuses[status]){
				stringOptions += "<option value=\"" + this.allstatuses[status] +"\" disabled>" + this.allstatuses[status] + "</option>"
			}else{
			// else print out all the other choices normally
				stringOptions += "<option value=\"" + this.allstatuses[status] +"\">" + this.allstatuses[status] + "</option>"
			}
        }
		/*
		 * Added if statement to make the first table element so that other
		 * elements could be added later
		 */
		if(tasksDiv.getElementsByTagName('table').length == 0){
			console.log(task.id + " " + task.title + " " +task.status);
			tasksDiv.innerHTML = 
					"<table>" +
						"<thead>" +
							"<tr>" +
								"<th>Task</th>" +
								"<th>Status</th>" +
							"</tr>" +
						"</thead>" +
						"<tbody>" +
							"<tr id=\"" + task.id + "\">"+
								"<td>" + task.title + "</td>" +
								"<td>" + task.status + "</td>" +
								"<td>" +
						"<select>" +
                       "<option value=\"0\" selected=\"\">" +
                       "&lt;Modify&gt;" +
                       "</option>" + 
                       		stringOptions + 
                       "</select>" +
		                "</td>" + 
		                "<td>" +
		                	"<button type=\"button\" >Remove</button>" +
		                "</td>" +
                			"</tr>" +
           				"</tbody>" +
           			"</table>";
		}else{
			/*
			 * This is elements that are added after the first element in the
			 * JSON is added
			 */
			console.log(task.id + " " + task.title + " " + task.status);

			const newTask = document.createElement("tr");
			newTask.setAttribute("id", task.id);
			newTask.innerHTML = 
				"<td>" + 
					task.title + 
				"</td>" +
				"<td>" + 
					task.status + 
				"</td>" +
				"<td>" +
                	"<select>" +
	                   "<option value=\"0\" selected=\"\">" +
	                   		"&lt;Modify&gt;" +
	                   "</option>" + 
	                   		stringOptions + 
	                 "</select>" +
	            "</td>" + 
	            "<td>" +
	            	"<button type=\"button\">Remove</button>" +
	            "</td>";
            const list = tasksDiv;
			tasksDiv.getElementsByTagName('tbody')[0].appendChild(newTask);
		}

		// Change status function in use
		
		const select = document.getElementById(task.id).getElementsByTagName('select')[0];
		select.addEventListener('change', function(){
			const status = select.options[select.selectedIndex].value;	
			console.log(status);
			let choice = confirm("Set '" + task.title + "' to "+ status + "?");
			if(choice){ 
				task.status = status;
				gui.newStatusCallback = task;
			} else {
				console.log("You just cancelled to update a task status!");
			}
		// gui.updateTask(task);
		
		});
		// Delete function in use
		const deleteButton = document.getElementById(task.id).getElementsByTagName('button')[0];
		deleteButton.addEventListener('click', function(){
			// This is the confirm window
			let choice = confirm("Delete task '" + task.title + "'?");
			if(choice){ 
				gui.deleteTaskCallback = task.id;
			} else {
				console.log("You just cancelled to delete a task!");
			}
		});
	}
	
	/*
	 * Update the displayed status of task. The task (i.e. the task id) must
	 * already exist in the view.
	 */
	updateTask(task){
		const node = document.getElementById(task.id);
		if(task.title != null){
			node.getElementsByTagName('td')[0].innerHTML = task.title;
		}
		console.log('ID er: ' + task.id);
		const select = document.getElementById(task.id).getElementsByTagName('select')[0];
		const status = select.options[select.selectedIndex].value;		
			if(status != 0){
				node.getElementsByTagName('td')[1].innerHTML = status;
			}
			node.getElementsByTagName('select')[0].selectedIndex = 0;
			console.log(task.status);
		}
		
	
	/*
	 * Removes task from the view. A task with the given id must exist in the
	 * view.
	 */
	 removeTask(id) {
		let task = document.getElementById(id); 
		if (task != null) {
			task.parentElement.removeChild(task); 
		}
	}
	 
	/*
	 * Tells GuiHandler that the list of tasks are empty, e.g. when the database
	 * has no tasks.
	 */
	noTask(){
		
	}

}	
  const statuses = ["WAITING", "ACTIVE", "DONE"];
  const tasks = [
	    { id: 1, title: "Paint roof", status: "WAITING" },
	    { id: 2, title: "Clean floor", status: "DONE" },
	    { id: 3, title: "Wash windows", status: "ACTIVE" }
	  ];
  const gui = new GuiHandler(statuses);
  
  tasks.forEach(task => {
    gui.showTask(task);
  });
  

}