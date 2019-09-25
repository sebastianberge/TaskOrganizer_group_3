"use strict"

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

gui.noTask();


/*
 * For the modal
 */
const tasksmodaleboxdiv = document.getElementById("taskbox");
const tasknewbutton = document.getElementById("newtask");
const taskbox = new TaskBox();
taskbox.allstatuses = statuses;
taskbox.onsubmit = (task) => {
	console.log("New task " + task.title + " with initial status " + task.status + " is added by the user.");
   // gui.showTask(task);
    taskbox.close()
};
tasknewbutton.addEventListener("click", () => {
    taskbox.show()
}, true);
