async function allstatuses() {
    const url='../TaskServices/broker/allstatuses'

    try {
        const response = await fetch(url,{method: "GET"})
        try {
            const text = await response.text()
            console.log(text)
        } catch (error) {
            console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
}

async function deleteTask() {
    const url='../TaskServices/broker/task/2'
    try {
        const response = await fetch(url,{method: "DELETE"})
        try {
            const text = await response.text()
            console.log(text)
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
}

async function modifyTask() {
    const url='../TaskServices/broker/task/2'
    try {
        const response = await fetch(url,{
            method: "PUT",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({'status': 'DONE'})
        })
        try {
            const text = await response.text()
            console.log(text)
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
}

async function newTask() {
    
    const url='../TaskServices/broker/task'
    try {
        const response = await fetch(url,{
            method: "POST",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({"title":"Something more to do", "status": "WAITING"})
        })
        try {
            const text = await response.text()
            console.log(text)
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
}

async function taskList() {
    const url='../TaskServices/broker/tasklist'
    try {
        const response = await fetch(url,{method: "GET"})
        try {
            const text = await response.text()
            console.log(text)
        } catch (error) {
            console.log(error)
        }            
    } catch (error) {
        console.log(error)
    }
}

allstatuses()
deleteTask()
modifyTask()
newTask()
taskList()