"use strict"

const gui = new GuiHandler();


/*
 * Adds a new task using ajax
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
            gui.showTask(resultTask);
        });
    } catch (error) {
        console.log(error);
    }
};

/*
 * Changes the status using ajax
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

/*
 * Deletes a task with the use of ajax
 */
gui.deleteTaskCallback = async (id) =>{
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
                	console.log("Could not delete the task")
                }
            })
    } catch (error) {
        console.log(error);
    }
};

/*
 * Setting up
 */
const setup = async () => {
    try {
    	/*
		 * Fetches all the statuses using ajax
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
                        console.log("No response from the fetch");
                    }
            });
        
        /*
		 * Fetches all of the saved tasks using ajax
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
                    console.log("No response from the fetch");
                }
            });
        
        /*
		 * for loop to view all of the tasks
		 */
        gui.tasks.forEach((task) => {
            gui.showTask(task);
        });
        console.log("Finished loading all of the tasks")

    } catch (error) {
        console.log(error);
    }  
    
    /*
	 * Runs the function noTask for viewing how many tasks there is
	 */
    gui.noTask();
    console.log("Finished up the setup process");
}

/*
 * TaskBox handling
 */
const tasksmodaleboxdiv = document.getElementById("taskbox");
const taskbox = new TaskBox(tasksmodaleboxdiv);
const tasknewbutton = document.getElementById("newTask");

taskbox.allstatuses = gui.allstatuses;
taskbox.onsubmit = addNewTask;
tasknewbutton.addEventListener("click", () => {
    taskbox.show()
}, true);

/*
 * Runs the getServerData when you refresh the page.
 */
window.addEventListener("load", setup);