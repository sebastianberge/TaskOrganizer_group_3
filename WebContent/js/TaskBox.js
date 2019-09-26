"use strict";

/*
 * This class enables use of the addTask Modal, it shows a modal when
 * initialized and called with show(). It has a callback function that will be
 * used when a task is added. Set this like t.onsubmit = x
 */

class TaskBox {

    constructor() {
        this._allstatuses = [];
        this._onsubmit = null;
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

    close() {
        let m = document.getElementById("taskbox");
        m.style.display = "none";
    }

    show() {
    	
    	console.log("Method 'show' now running.");
        // Get the modal
        let modal = document.getElementById("taskbox");
        
        // Get the button that opens the modal
        document.getElementById("modalButton").addEventListener('click', openModal);

        // Get the <span> element that closes the modal
        let span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal
        function openModal() {
          modal.style.display = "block";
          console.log("Clicked!");
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
          modal.style.display = "none";
        }
        
        let select = document.getElementById("modalStatuses");
        if (!select.hasChildNodes()) {
            for (let i = 0; i < this._allstatuses.length; i++) {
                let el = document.createElement("option");
                el.innerText = this._allstatuses[i];
                select.appendChild(el);
            }
        }

        // Show the modal.
        // modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.addEventListener("click", () => this.close(), true);

        let addTaskButton = document.getElementById("addTaskButton");

        addTaskButton.addEventListener("click", () => this.submit(), true);
        
    }

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
