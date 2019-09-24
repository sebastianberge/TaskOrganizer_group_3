"use strict";
{
	
class GuiHandler{
	
	constructor (allstatuses){
		this.allstatuses = allstatuses;
	}
	
	set allstatuses(allstatuses){
		this._allstatuses = allstatuses;
	}
	
	set deleteTaskCall(task){
		
	}
	
	set deleteTaskCall(task){
		
	}
	
	get allstatuses(){
		return this._allstatuses;
	}
	
	/*
	 * Display a new task at the the top of the viewed list. The id of task must
	 * not already exist in the view.
	 */
	showTask(task){
		const tasksDiv = document.getElementById('tasks');
		let stringOptions;
		for(status in this.allstatuses){
				stringOptions += "<option value=\"" + this.allstatuses[status] +"\">" + this.allstatuses[status] + "</option>";
        }
		if(tasksDiv.getElementsByTagName('table').length == 0){
			console.log(task.id + " " + task.title + " " +task.status);
			tasksDiv.innerHTML = "<table>" +
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
                       " <option value=\"0\" selected=\"\">&lt;Modify&gt;</option>" + stringOptions + 
                    "</select>" +
                "</td>" + 
                "<td><button type=\"button\" >Remove</button></td>" +
           " </tr></tbody></table>";
		}else{
			console.log(task.id + " " + task.title + " " + task.status);

			const nyTask = document.createElement("tr");
			nyTask.setAttribute("id", task.id);
			nyTask.innerHTML = "<td>" + task.title + "</td>" +
            "<td>" + task.status + "</td>" +
            "<td>" +
                "<select>" +
                   " <option value=\"0\" selected=\"\">&lt;Modify&gt;</option>" + stringOptions + 
                "</select>" +
            "</td>" + 
            "<td><button type=\"button\">Remove</button></td>";
            const list = tasksDiv;
			tasksDiv.getElementsByTagName('tbody')[0].appendChild(nyTask);
		}

		// Change status function in use
		const select = document.getElementById(task.id).getElementsByTagName('select')[0];
		select.addEventListener('change', function(){
			gui.updateTask(task);
		})
		// Delete function in use
		const deleteButton = document.getElementById(task.id).getElementsByTagName('button')[0];
		deleteButton.addEventListener('click', function(){
			gui.removeTask(task.id);
		})
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
		console.log('id er: ' + task.id);
		const select = document.getElementById(task.id).getElementsByTagName('select')[0];
		const status = select.options[select.selectedIndex].value;
		if(status != 0){
			node.getElementsByTagName('td')[1].innerHTML = status;
		}
		node.getElementsByTagName('select')[0].selectedIndex = 0;
	}
	
	/*
	 * Removes task from the view. A task with the given id must exist in the
	 * view.
	 */
	 removeTask(id) {
		let choice = confirm("Delete task '" + tasks[id].title + "'?");
		if(choice){
	    let task = document.getElementById(id);
	    if (task != null) {
	    		task.parentElement.removeChild(task);
	      }
		} else {
			return;
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
  
  // gui.removeTask(1);
  // gui.removeTask(3);
  // gui.removeTask(2);

}