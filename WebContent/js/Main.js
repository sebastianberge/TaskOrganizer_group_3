"use strict"

const taskHandler = new TaskHandler();
const gui = new GuiHandler();

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
		const addTaskCallback = async (task) => {
		    try {
		        const response = await fetch('../TaskServices/broker/task', {
		            method: 'POST',
		            body: JSON.stringify(task),
		            headers: {
		                'Content-Type': 'application/json'
		            }
		        });
		        taskbox.close();
		        await response.json().then(data => {
		            let resultTask = {
		                id: data.task.id,
		                title: data.task.title,
		                status: data.task.status
		            };
		            gui.showTask(resultTask);
		        });
		    } catch (e) {
		        console.log(`Got error ${e.message}.`)
	    }
		};
	
		const tasksmodaleboxdiv = document.getElementById("taskbox");
		const tasknewbutton = document.getElementById("newtask");
		const taskbox = new TaskBox(tasksmodaleboxdiv);

		taskbox.allstatuses = json.allstatuses;
		taskbox.onsubmit = addTaskCallback
		tasknewbutton.addEventListener("click", () => {
			taskbox.show()
		}, true);
})
	console.log("Finished up the setup process");
}

setup()


