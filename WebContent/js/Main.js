"use strict"

/**
 * Creating GuiHandler and TaskBox objects.
 */
const taskbox = new TaskBox();
const gui = new GuiHandler();


/**
 * Changes the status using ajax.
 * 
 * @async
 */
gui.newStatusCallback = async (id,newStatus) => {
    const url = '../TaskServices/broker/task/' + id;
    try {
        const response = await fetch(url,{
            method: "PUT",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({"status": newStatus})
        });
        try {
            const text = await response.json();
            console.log("Updated the task with ID: " + text.id + " to " + text.status);
            gui.updateTask(text);
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
};

/**
 * Deletes a task with the use of ajax.
 * 
 * @async
 */
gui.deleteTaskCallback = async (id) => {
    try {
        await fetch('../TaskServices/broker/task/' + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(result => {
                return result.json();
            })
            .then(data =>{
                if (data.responseStatus === true){
                	console.log("Deleted the task with ID: " + data.id);
                    gui.removeTask(id);
                }else{
                	console.log("Could not delete the task!");
                }
            })
    } catch (error) {
        console.log(error);
    }
};

/**
 * Fetches allstatuses and the task list and uses a for-loop in the gui class to
 * show the tasks.
 * 
 * @async
 */
const setup = async () => {
    try {
    	
    	/**
		 * Fetches all the statuses using ajax.
		 * 
		 * @async
		 */
        await fetch('../TaskServices/broker/allstatuses')
            .then(resolve =>{
                return resolve.json();
            })
            .then(data =>{
                    if(data.responseStatus === true){
                        data.allstatuses.forEach(el =>{
                            gui.allstatuses.push(el);
                        })
                    } else {
                        console.log("No response from the fetch!");
                    }
            });
        
        /**
		 * Fetches all of the saved tasks using ajax.
		 * 
		 * @async
		 */
        await fetch('../TaskServices/broker/tasklist')
            .then(resolve =>{
                return resolve.json();
            })
            .then(data =>{
                const enableButton = document.getElementById("newTask");
                enableButton.disabled = false;
                if (data.responseStatus === true){
                    data.tasks.forEach(el =>{
                        gui.tasks.push(el);
                    })
                }else {
                    console.log("No response from the fetch!");
                }
            });
        
        /**
		 * For-loop going through every task adding it to the html page.
		 */
        gui.tasks.forEach((task) => {
            gui.view(task);
        });
        console.log("Finished loading all of the tasks!");
        
    } catch (error) {
    	
        console.log(error);
    
    }  
    
    /**
	 * Runs the function noTask for viewing how many tasks there is in the viewd
	 * list
	 * 
	 * @async
	 */
    gui.noTask();
    console.log("Finished up the setup process!");
}

/**
 * Adds a new task using ajax.
 * 
 * @async
 */
const addNewTask = async (task) => {
    
	try {
        const response = await fetch('../TaskServices/broker/task', {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        });
        taskbox.close();
        await response.json().then(data => {
            let resultTask = {
                id: data.task.id,
                title: data.task.title,
                status: data.task.status
            };
            console.log("The task " + resultTask.title + " was added!");
            gui.view(resultTask);
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * TaskBox handling. Fetching the html elements. Adding statuses and on submit to
 * task box. And event listener to the new task button for showing the task box.
 */
const tasksmodaleboxdiv = document.getElementById("taskbox");
const tasknewbutton = document.getElementById("newTask");

taskbox.allstatuses = gui.allstatuses;
taskbox.onsubmit = addNewTask;
tasknewbutton.addEventListener("click", () => taskbox.show(), true);

/**
 * Runs the setup when the page load.
 */
window.addEventListener("load", setup);