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

	
	// ----------------- TASK BOX -----------------
	const tasksmodaleboxdiv = document.getElementById("taskbox");
	const tasknewbutton = document.getElementById("newtask");
	taskbox.allstatuses = json.allstatuses;
	tasknewbutton.addEventListener("click", () => {
	    taskbox.show()
	}, true);
	// ----------------- TASK BOX -----------------
})
console.log("Finished up the setup process");
}

setup()


