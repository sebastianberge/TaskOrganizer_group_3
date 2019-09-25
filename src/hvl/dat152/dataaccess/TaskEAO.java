package hvl.dat152.dataaccess;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import hvl.dat152.model.Task;
import hvl.dat152.model.Task.Status;

@Stateless
public class TaskEAO {

    @PersistenceContext(name = "taskPersistenceUnit")
    private EntityManager em;

    public void addTask(Task t) {
        em.persist(t);
    }

    public void removeTask(Integer taskId) {
        Task t = em.find(Task.class, taskId);
        if (t != null) {
            em.remove(t);
        }
    }
    
    public List<Task> getTasks() {
        TypedQuery<Task> query = em.createNamedQuery("Task.findAll", Task.class);
        return query.getResultList();
    }

    public Task setStatus(Integer taskId,Status newStatus) {
        Task t = em.find(Task.class, taskId);
        if (t != null) {
            t.setStatus(newStatus);
        }
        return t;
    }

    public void destroy() {
        em.close();
    }
    
    public Integer size() {
        TypedQuery<Task> query = em.createNamedQuery("Task.findAll", Task.class);
        return query.getResultList().size();
    }
}
