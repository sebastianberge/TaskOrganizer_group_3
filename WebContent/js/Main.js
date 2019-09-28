"use strict"

const ajax = new AjaxHandler();
const gui = new GuiHandler();
const taskbox = new TaskBox();


function setup(){
	
	//Get all statuses from ajax
	ajax.allstatuses()
	.then((text) => {
		let json = JSON.parse(text)
		gui.allstatuses = json.allstatuses
		
		//Get all tasks from ajax
		ajax.getAllTasks()
		.then(tasks => {
			let json = JSON.parse(tasks)
			let allTasks = json.tasks
			for (let i = 0; i < allTasks.length; i++){
				gui.showTask(allTasks[i])
			}
	})
	
	//Gets and add the modal
	const tasksmodaleboxdiv = document.getElementById("taskbox");
	const tasknewbutton = document.getElementById("newtask");
	taskbox.show();
	taskbox.allstatuses = json.allstatuses;
	taskbox.onsubmit = (task) => {
		console.log("New task " + task.title + " with initial status " + task.status + " is added by the user.");
	    taskbox.close()
	};
	tasknewbutton.addEventListener("click", () => {
	    taskbox.show()
	}, true);
})
console.log("Finished up the setup process");
}

setup()


