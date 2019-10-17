"use strict";

class GuiHandler {
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

    removeTask = (id) => {
        let item = document.getElementById(id);
        item.parentElement.removeChild(item);
        this.noTask();

    };

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
        let buttons = document.getElementsByClassName('remove-btn');
        let selectors = document.getElementsByClassName('select-element');

        /*
		 * 
		 */
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
        buttons[0].addEventListener("click", this.onRemoveButtonClick);
        selectors[0].addEventListener("change", this.onUpdateStatus)
        
        /*
		 * Fetches and shows how many tasks there are in the table
		 */
        this.noTask();
    };

    noTask = () => {
        let tbody = document.getElementById("tbody");
        let count = tbody.rows.length;

        if (count > 0) {
            document.getElementById("message").innerHTML = "Found " + count + " tasks.";

        } else {
            document.getElementById("message").innerHTML = "No task was found";
        }
    }

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

    onRemoveButtonClick(event) {
        let button = event.currentTarget;
        let tableRow = button.parentElement.parentElement;
        let taskName = tableRow.getElementsByTagName("td")[0].textContent;
        if (window.confirm("delete task " + taskName + "?")) {
            gui.deleteTaskCallbackArray.forEach((x) => x(tableRow.id))
        }
    }

    onUpdateStatus(event) {
        let selector = event.currentTarget;
        let taskName = selector.parentElement.parentElement.getElementsByTagName("td")[0].textContent;
        let selectedValue = event.currentTarget.value;
        if (window.confirm("Set " + taskName + " to " + selectedValue)) {
            gui.newStatusCallbackArray.forEach((x) => x(selector.parentElement.parentElement.id, selectedValue))
        }
    }
}