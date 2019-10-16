"use strict";

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

    /*
     * Used to show the modal
     */
    show() {
        let modal = document.getElementById("taskbox");
        let span = document.getElementsByClassName("close")[0];
        let select = document.getElementById("modalStatuses");
        let addTaskButton = document.getElementById("addTaskButton");
        let modalButton = document.getElementById("modalButton");
        
        modalButton.addEventListener('click', openModal);
        span.addEventListener("click", () => this.close(), true);

        span.onclick = function() {
            modal.style.display = "none";
          }
        
       
        addTaskButton.addEventListener("click", function(){
        	let title = document.getElementById("taskInput").value;
            let select = document.getElementById("modalStatuses");
            let status = select.options[select.selectedIndex].value;
            
            if(title == ""){
            	alert("The title can't be empty")
            } else {
            let task = new Task(title, status);
            
			gui.newTaskCallback = task
			this.close;
            }
        });
        
        
        function openModal() {
          modal.style.display = "block";
        }
   
        if (!select.hasChildNodes()) {
            for (let i = 0; i < this._allstatuses.length; i++) {
                let el = document.createElement("option");
                el.innerText = this._allstatuses[i];
                select.appendChild(el);
            }
        }
    }
}

class Task {
    constructor(title, status) {
        this.title = title;
        this.status = status;
    }
}