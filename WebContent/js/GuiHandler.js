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
	
	showTask(task){
		const tasksDiv = document.getElementById('tasks');
		let stringOptions;
		for(status in this.allstatuses){
			if(task.status == this.allstatuses[status]){
				stringOptions += "<option value=\"" + this.allstatuses[status] +"\" disabled>" + this.allstatuses[status] + "</option>";
			}else{
				stringOptions += "<option value=\"" + this.allstatuses[status] +"\">" + this.allstatuses[status] + "</option>";
			}
			
        }
		if(tasksDiv.getElementsByTagName('table').length == 0){			
			tasksDiv.innerHTML = "<table><thead><tr><th>Task</th><th>Status</th></tr></thead> <tbody><tr id=\"" + task.id + "\">"+
                "<td>" + task.title + "</td>" +
                "<td>" + task.status + "</td>" +
                "<td>" +
                    "<select>" +
                       " <option value=\"0\" selected=\"\">&lt;Modify&gt;</option>" + stringOptions + 
                    "</select>" +
                "</td>" + 
                "<td><button type=\"button\">Remove</button></td>" +
           " </tr></tbody></table>";
		}else{
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

		const select = document.getElementById(task.id).getElementsByTagName('select')[0];
		select.addEventListener('change', function(){
			gui.updateTask(task);
		})
		
	}
	
	updateTask(task){
		const node = document.getElementById(task.id);
		if(task.title != null){
			node.getElementsByTagName('td')[0].innerHTML = task.title;
		}
		const select = document.getElementById(task.id).getElementsByTagName('select')[0];
		const status = select.options[select.selectedIndex].value;
		if(status != 0){
			node.getElementsByTagName('td')[1].innerHTML = status;
		}
		node.getElementsByTagName('select')[0].selectedIndex = 0;
		
	}
	
	removeTask(id) {
	      let task = document.getElementById(id);
	      if (task != null) {
	        task.parentElement.removeChild(task);
	      }
	}
	
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