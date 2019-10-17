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
        
        let addTaskButton = document.getElementById("addTaskButton");
        let span = document.getElementsByClassName("close")[0];
        
        addTaskButton.addEventListener("click", () => this.submit(), true);
        span.addEventListener("click", () => this.close(), true);

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
        let m = document.getElementById("taskbox");
        m.style.display = "none";
    }

    /*
	 * Function for showing the task box
	 */
    show() {
        let modal = document.getElementById("taskbox");
        let select = document.getElementById("modalStatuses");

        if (!select.hasChildNodes()) {
            for (let i = 0; i < this._allstatuses.length; i++) {
                let el = document.createElement("option");
                el.innerText = this._allstatuses[i];
                select.appendChild(el);
            }
        }
        modal.style.display = "block";
    }

    /*
	 * 
	 */
    submit() {
        let title = document.getElementById("taskInput").value;
        let select = document.getElementById("modalStatuses");
        let status = select.options[select.selectedIndex].value;

        let task = new Task(title, status);
        this._onsubmit(task)
    }
}

class Task {
    constructor(title, status) {
        this.title = title;
        this.status = status;
    }
}