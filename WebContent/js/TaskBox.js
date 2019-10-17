"use strict";


class TaskBox {
	
    constructor(statuses, onsubmit) {
        if (arguments.length > 0) {
            this._allstatuses = statuses;
            this._onsubmit = onsubmit;
        } else {
            this._allstatuses = [];
            this._onsubmit = null;
        }
        
        let addTaskButtonElement = document.getElementById("addTaskButton");
        let spanElement = document.getElementsByClassName("close")[0];
        
        addTaskButtonElement.addEventListener("click", () => this.submit(), true);
        spanElement.addEventListener("click", () => this.close(), true);

    }

    get allstatuses() {
        return this._allstatuses;
    }

    set allstatuses(s) {
        this._allstatuses = s;
    }

    set onsubmit(o) {
        this._onsubmit = o;
    }

    /*
	 * Function for closing the task box
	 */
    close() {
        let tb = document.getElementById("taskbox");
        tb.style.display = "none";
    }

    /*
	 * Function for showing the task box
	 */
    show() {
        let modalElement = document.getElementById("taskbox");
        let selectElement = document.getElementById("modalStatuses");

        if (!selectElement.hasChildNodes()) {
            for (let i = 0; i < this._allstatuses.length; i++) {
                let el = document.createElement("option");
                el.innerText = this._allstatuses[i];
                selectElement.appendChild(el);
            }
        }
        modalElement.style.display = "block";
    }

    /*
	 * 
	 */
    submit() {
        let titleInput = document.getElementById("taskInput").value;
        let select = document.getElementById("modalStatuses");
        let statusInput = select.options[select.selectedIndex].value;

        let task = new Task(titleInput, statusInput);
        this._onsubmit(task)
    }
}

class Task {
    constructor(title, status) {
        this.title = title;
        this.status = status;
    }
}