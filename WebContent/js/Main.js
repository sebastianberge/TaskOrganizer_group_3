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
const tasksmodaleboxdiv = document.getElementById("taskbox");
const tasknewbutton = document.getElementById("newtask");

taskbox = new TaskBox(tasksmodaleboxdiv);
let taskBoxStatus = ["Waiting", "Done", "Active"];
const gui2 = new GuiHandler();
taskbox.allstatuses = taskBoxStatus;
taskbox.onsubmit = (task) => {
    gui2.showTask(task);
    taskbox.close()
};
tasknewbutton.addEventListener("click", () => {
    taskbox.show()
}, true);
*/