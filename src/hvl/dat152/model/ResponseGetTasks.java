package hvl.dat152.model;

import java.util.List;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ResponseGetTasks extends ServerResponse {
    private List<Task> tasks;

    public ResponseGetTasks(){}

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
