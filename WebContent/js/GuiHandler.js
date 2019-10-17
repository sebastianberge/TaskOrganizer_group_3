"use strict";

class GuiHandler {
	/*
	 * 
	 */
    constructor() {
        this.tasks = [];
        this.allstatuses = [];
        this.deleteTaskCallbackArray = [];
        this.newStatusCallbackArray = [];
    }

    set deleteTaskCallback(funk) {
        this.deleteTaskCallbackArray.push(funk);
    }

    set newStatusCallback(funk) {
        this.newStatusCallbackArray.push(funk);
    }

    /*
     * 
     */
    removeTask = (id) => {
        let task = document.getElementById(id);
        task.parentElement.removeChild(task);
        console.log()
        this.noTask();
    };

    /*
     * 
     */
    showTask = (task) => {
        let tekstloop = `<select class="select-element">
        <option value="0" selected="">&lt;Modify&gt;</option>`;
        for (const status of this.allstatuses) {
            let disb = ``;
            if (task.status === status) {
                disb = ` disabled=""`;
            }
            tekstloop += `
            <option value="${status}"${disb}>${status}</option>
            `;
        }
        tekstloop += `</select>`;
        
        /*
		 * Creating and fetching elements from/to tasks.html
		 */
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td")
        
        let tableButton = document.createElement("button");
        let tbody = document.getElementById("tbody");
        let removeButton = document.getElementsByClassName('remove-btn');
        let selectors = document.getElementsByClassName('select-element');

        tr.setAttribute("id", task.id);
    
        td1.textContent = task.title;
        td2.textContent = task.status;
        td3.innerHTML = tekstloop;
        
        tableButton.setAttribute("id", "rbtn");
        tableButton.setAttribute("class", "remove-btn");
        tableButton.setAttribute("type", "button");
        tableButton.textContent = "Remove";
        
        td4.appendChild(tableButton);
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        /*
		 * 
		 */
        tbody.insertBefore(tr, tbody.childNodes[0]);
        removeButton[0].addEventListener("click", this.onRemoveButtonClick);
        selectors[0].addEventListener("change", this.onUpdateStatus)
        
        /*
		 * Fetches and shows how many tasks there are in the table
		 */
        this.noTask();
    };
    
    /*
     * 
     */
    updateTask = (task) => {
        document.getElementById(task.id).getElementsByTagName("td")[1].innerHTML = task.status;
        const test = document.getElementById(task.id).getElementsByTagName("td")[2];
        test.querySelector(".select-element").value = "0";
        const optionEl = test.getElementsByTagName("option");
        for (let i = 0; i < optionEl.length; i++) {
            if (optionEl[i].value === task.status) {
                optionEl[i].disabled = true;
            } else {
                optionEl[i].disabled = false;
            }
        }

    }

    /*
     * 
     */
    onRemoveButtonClick(event) {
        let button = event.currentTarget;
        let tableRow = button.parentElement.parentElement;
        let taskName = tableRow.getElementsByTagName("td")[0].textContent;
        
        let choice = confirm("Delete task " + taskName + "?");
        if(choice){
        	 gui.deleteTaskCallbackArray.forEach((x) => x(tableRow.id))
             
        } else {
        	console.log("You just cancelled to delete a task!");
        }
        
    }

    /*
     * 
     */
    onUpdateStatus(event) {
        let selector = event.currentTarget;
        let taskName = selector.parentElement.parentElement.getElementsByTagName("td")[0].textContent;
        let selectedValue = event.currentTarget.value;
        
        let choice = confirm("Set " + taskName + " to " + selectedValue + "?");
        if (choice) {
            gui.newStatusCallbackArray.forEach((x) => x(selector.parentElement.parentElement.id, selectedValue))
        } else {
        	console.log("You just cancelled to update a task status!");
        }
    }
    
    /*
     * 
     */
    noTask = () => {
        let tbody = document.getElementById("tbody");
        let count = tbody.rows.length;

        if (count === 0) {
            document.getElementById("message").innerHTML = "Waiting for server data.";
        } else {
            document.getElementById("message").innerHTML = "Found " + count + " tasks.";
        }
    }
}