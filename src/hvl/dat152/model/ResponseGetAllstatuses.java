package hvl.dat152.model;

import java.util.List;
import javax.xml.bind.annotation.XmlRootElement;
import hvl.dat152.model.Task.Status;

@XmlRootElement
public class ResponseGetAllstatuses extends ServerResponse {

    private List<Status> allstatuses;

    public ResponseGetAllstatuses(){}

    public List<Status> getAllstatuses() {
        return allstatuses;
    }

    public void setAllstatuses(List<Status> allstatuses) {
        this.allstatuses = allstatuses;
    }
}
