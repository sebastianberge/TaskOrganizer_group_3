class TaskBox{
	constructor(allstatuses, onsubmit){
		this.allstatuses = allstatuses;
		this.onsubmit = onsubmit;
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
		
	}
	
}