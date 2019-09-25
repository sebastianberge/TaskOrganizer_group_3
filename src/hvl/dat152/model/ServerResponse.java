package hvl.dat152.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ServerResponse {

    private Boolean responseStatus = false;

    public Boolean getResponseStatus() {
        return responseStatus;
    }

    public void setResponseStatus(Boolean responseStatus) {
        this.responseStatus = responseStatus;
    }
}
