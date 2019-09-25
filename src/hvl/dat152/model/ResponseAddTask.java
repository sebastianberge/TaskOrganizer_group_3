package hvl.dat152.model;

public class ResponseAddTask extends ServerResponse {

    private Task task;
    
    public ResponseAddTask() {}

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
}
