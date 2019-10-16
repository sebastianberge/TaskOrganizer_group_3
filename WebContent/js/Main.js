"use strict"

const taskHandler = new TaskHandler();
const gui = new GuiHandler();
const taskbox = new TaskBox();

/*
 * Uses this to build the application
 */
function setup(){
	
	// Get all statuses from ajax
	taskHandler.allstatuses()
	.then((text) => {
		let json = JSON.parse(text)
		gui.allstatuses = json.allstatuses
		
		// Get all tasks from ajax
		taskHandler.getAllTasks()
		.then(tasks => {
			let json = JSON.parse(tasks)
			let allTasks = json.tasks
			for (let i = 0; i < allTasks.length; i++){
				gui.showTask(allTasks[i])
			}
	})
	
		// The TaskBox
		const tasksmodaleboxdiv = document.getElementById("taskbox");
		const tasknewbutton = document.getElementById("newtask");
		taskbox.allstatuses = json.allstatuses;
		tasknewbutton.addEventListener("click", () => {
			taskbox.show()
		}, true);
})
	console.log("Finished up the setup process");
}

setup()


