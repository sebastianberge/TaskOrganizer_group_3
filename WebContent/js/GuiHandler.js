"use strict";
	
class GuiHandler{
	
	constructor (allstatuses){
		this.allstatuses = allstatuses;
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
		taskHandler.deleteTask(id)
		.then(text => {
			let json = JSON.parse(text)
			if (json.responseStatus == 1){
				this.removeTask(id);
			} else {
				console.log("The task was not deleted.")
			}
		})
	}
	
	/*
	 * Setter that adds new task
	 */
	set newTaskCallback(task){
		taskHandler.addNewTask(task)
			.then(text => {
				let json = JSON.parse(text)
				if (json.responseStatus == 1){
					console.log("The task has been added.")
					location.reload(false)
				} else {
					console.log("The task was not added.")
				}	
			})
	}
	
	/*
	 * Setter that adds a callback to run when an Modify select element is
	 * changed.
	 */
	set newStatusCallback(task){
		taskHandler.modifyStatus(task)
		.then(text => {
			let json = JSON.parse(text)
			if (json.responseStatus == 1){
				this.updateTask(task);
				location.reload(false)
			} else {
				console.log("Status was not updated.")
			}
		})
	}
	
	/*
	 * Display a new task at the the top of the viewed list. The id of task must
	 * not already exist in the view.
	 */
	showTask(task){
	
		const tasksDiv = document.getElementById('tasks');
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
			const newTaskc = document.createElement("tr");
			newTaskc.setAttribute("id", task.id);
			newTaskc.innerHTML = 
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
			tasksDiv.getElementsByTagName('tbody')[0].appendChild(newTaskc);
		}

		// Change status function in use
		
		const select = document.getElementById(task.id).getElementsByTagName('select')[0];
		select.addEventListener('change', function(){
			const status = select.options[select.selectedIndex].value;	
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
		
		this.noTask();

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
			
			this.noTask();

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
		this.noTask();
	}
	  
	/*
	 * Tells GuiHandler that the list of tasks are empty, e.g. when the database
	 * has no tasks.
	 */
	noTask(){
		let tbody = document.getElementById('tasks').getElementsByTagName('tbody')[0];
        let count = tbody.rows.length;

        if (count === 0) {
            document.getElementById('message').innerHTML = "Waiting for server data.";
        } else {
            document.getElementById('message').innerHTML = "Found " + count + " tasks.";
        }
	}

}	