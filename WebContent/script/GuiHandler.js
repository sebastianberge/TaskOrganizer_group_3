"use strict";

const gui = new GuiHandler()
const statuses = ["WAITING","ACTIVE","DONE"]
const tasks = [
    {"id":1,"title":"Paint roof","status":"WAITING"},
    {"id":2,"title":"Clean floor","status":"DONE"},
    {"id":3,"title":"Wash windows","status":"ACTIVE"}
]

gui.allstatuses = statuses
tasks.forEach((task) => {gui.showTask(task)})