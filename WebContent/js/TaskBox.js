class TaskBox{
	constructor(allstatuses){
		this.allstatuses = allstatuses;
		this.onsubmit = null;
	}
	
	/*
	 * Setter/property to set a list of all possible task states, i.e. the
	 * values that can be selected in the select element.
	 */
	set allstatuses(allstatuses){
		this._allstatuses = allstatuses;
	}
	
	/*
	 * Setter/property to set a list of all possible task states, i.e. the
	 * values that can be selected in the select element.
	 */
	get allstatuses(){
		return this._allstatuses;
	}
	
	/*
	 * the modale box should disappear from view.
	 */
	close(){
		 let taskBox = document.getElementById("taskbox");
		 taskBox.style.display = "none";
	}
	
	show(){
	
	}
	
	submit(){
	
	}
}
