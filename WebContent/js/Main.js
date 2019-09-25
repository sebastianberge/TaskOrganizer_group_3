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