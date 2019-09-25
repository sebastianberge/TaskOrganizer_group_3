package hvl.dat152.services;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import hvl.dat152.dataaccess.TaskEAO;
import hvl.dat152.model.ResponseAddTask;
import hvl.dat152.model.ResponseDeleteTask;
import hvl.dat152.model.ResponseGetAllstatuses;
import hvl.dat152.model.ResponseGetTasks;
import hvl.dat152.model.ResponsePutTaskStatus;
import hvl.dat152.model.Task;
import hvl.dat152.model.TaskStatus;
import hvl.dat152.model.Task.Status;

/**
 * @author bki
 *
 */
@Path("broker")
public class TaskWebServices {

    @EJB
    private TaskEAO taskEAO = new TaskEAO();

    @Path("/tasklist")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseGetTasks getTasks () {
        ResponseGetTasks response = new ResponseGetTasks();

        List<Task> tasks = taskEAO.getTasks();
        response.setTasks(tasks);
        response.setResponseStatus(true);
        return response;
    }

    @Path("/allstatuses")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseGetAllstatuses getStatuses() {
        List<Status> allstatuses = new ArrayList<Status>();
        for (Status statuses : Status.values()) {
            allstatuses.add(statuses);
        }
        ResponseGetAllstatuses response = new ResponseGetAllstatuses();
        response.setAllstatuses(allstatuses);
        response.setResponseStatus(true);
        return response;
    }

    //@PathParam("id") Integer id,
    @Path("/task/{id}")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    //public ServerResponse UpdatedTaskStatuses(@Context UriInfo ui,@PathParam(taskId") Integer taskId, TaskStatus taskStatus) {
    public ResponsePutTaskStatus UpdatedTaskStatuses(@PathParam("id") Integer taskId, TaskStatus status) {
        ResponsePutTaskStatus response = new ResponsePutTaskStatus();
        if ( (taskId != null) && (status != null)) {
            taskEAO.setStatus(taskId,status.getStatus());

            response.setId(taskId);
            response.setStatus(status.getStatus());
            response.setResponseStatus(true);
        }
        return response;
    }

    @Path("/task")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public ResponseAddTask AddTask(Task task) {
        ResponseAddTask response = new ResponseAddTask();
        if (task != null) {
            taskEAO.addTask(task);

            response.setTask(task);
            response.setResponseStatus(true);
        }
        return response;
    }

    @Path("/task/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON )
    public ResponseDeleteTask deleteMember(@PathParam("id") Integer id) {
        ResponseDeleteTask deleteResponse = new ResponseDeleteTask();
        if (id != null) {
            if (id >= 1) {
                taskEAO.removeTask(id);
                deleteResponse.setId(id);
                deleteResponse.setResponseStatus(true);
            }
        }
        return deleteResponse;
    }
}
