"use strict";

class GuiHandler {

	/**
	 * 
	 */
    constructor() {
        this.tasks = [];
        this.allstatuses = [];
        this.deleteTaskCallbackArray = [];
        this.newStatusCallbackArray = [];
    }
    
    /**
	 * To set a list of all possible task state, i.e. the values that can be
	 * chosen with the HTML select elements.
	 */
    set allstatuses(allstatuses){
		this._allstatuses = allstatuses;
	}
    
    /**
	 * to set a list of all possible task state, i.e. the values that can be
	 * chosen with the HTML select elements.
	 */
	get allstatuses(){
		return this._allstatuses;
	}

    /**
	 * Delete task callback setter
	 */
    set deleteTaskCallback(f) {
        this.deleteTaskCallbackArray.push(f);
    }
    
    /**
	 * New status callback setter
	 */
    set newStatusCallback(f) {
        this.newStatusCallbackArray.push(f);
    }

    /**
	 * Shows all tasks using a forEach loop in Main.js
	 */
    showTask = task => {
 
        let tekstloop = `<select class="select-element">
        <option value="0" selected="">&lt;Modify&gt;</option>`;
        
        for (const status of this.allstatuses) {
            let disb = ``;
            if (task.status === status) {     	
                disb = ` disabled=""`;             
            }            
            tekstloop += ` <option value="${status}"${disb}>${status}</option>`;            
        }        
        tekstloop += `</select>`;
        
        let tr = document.createElement("tr");
     
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        
        let tableButton = document.createElement("button");
        let tbody = document.getElementById("tbody");
        let removeButton = document.getElementsByClassName('remove-btn');
        let selectors = document.getElementsByClassName('select-element');

        tr.setAttribute("id", task.id);
    
        td1.textContent = task.title;
        td2.textContent = task.status;
        td3.innerHTML = tekstloop;
        
        tableButton.setAttribute("class", "remove-btn");
        tableButton.setAttribute("type", "button");
        tableButton.setAttribute("id", "rbtn");
        tableButton.textContent = "Remove";
        
        td4.appendChild(tableButton);
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        tbody.insertBefore(tr, tbody.childNodes[0]);
        
        removeButton[0].addEventListener("click", this.removeTaskClick);
        selectors[0].addEventListener("change", this.updateTaskClick)
        
        this.noTask();
    };
    

    /**
	 * Remove task
	 */
    removeTaskClick = (e) => {
        let button = e.currentTarget;
        let tableRow = button.parentElement.parentElement;
        let taskName = tableRow.getElementsByTagName("td")[0].textContent;
        
        let choice = confirm("Delete task " + taskName + "?");
        
        if(choice){
        	 gui.deleteTaskCallbackArray.forEach((x) => x(tableRow.id))    
        } else {
        	console.log("You just cancelled to delete a task!");
        } 
    }

    /**
	 * This code is run if there is a change in the selector element.
	 */
    updateTaskClick = (e) => {
        let selector = e.currentTarget;
        let selectedValue = e.currentTarget.value;
    	let taskName = selector.parentElement.parentElement.getElementsByTagName("td")[0].textContent;
    
        let choice = confirm("Set " + taskName + " to " + selectedValue + "?");
        
        if (choice) {
        	console.log(gui.newStatusCallbackArray)
            gui.newStatusCallbackArray.forEach((x) => x(selector.parentElement.parentElement.id, selectedValue))
        } else {
        	console.log("You just cancelled to update a task status!");
        }
    }
    
    /**
	 * Remove task from view
	 */
    removeTask = (id) => {
    	let task = document.getElementById(id); 
		if (task != null) {
			task.parentElement.removeChild(task); 
		}
		this.noTask();
    };
    
    /**
	 * Update task status in the view.
	 */
    updateTask = (task) => {
    	const node = document.getElementById(task.id);
		if(task.title != null){
			node.getElementsByTagName('td')[0].innerText = task.title;
		}
		console.log('ID er: ' + task.id);
		const select = document.getElementById(task.id).getElementsByTagName('select')[0];
		const status = select.options[select.selectedIndex].value;		
			if(status != 0){
				node.getElementsByTagName('td')[1].innerText = status;
			}
			node.getElementsByTagName('select')[0].selectedIndex = 0;
			console.log(task.status);
			
			this.noTask();
    }
    
    /**
	 * Checks how many tasks you have and view it in the view
	 */
    noTask = () => {
        let tbody = document.getElementById("tbody");
        let count = tbody.rows.length;

        if (count === 0) {
            document.getElementById("message").innerText = "Waiting for server data.";
        } else {
            document.getElementById("message").innerText = "Found " + count + " tasks.";
        }
    }
}