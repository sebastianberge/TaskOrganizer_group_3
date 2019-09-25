package hvl.dat152.services;

import javax.ejb.EJB;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import hvl.dat152.dataaccess.TaskEAO;
import hvl.dat152.model.Task;
import hvl.dat152.model.Task.Status;

public class MyContextListener implements ServletContextListener {

    @EJB
    private TaskEAO taskEAO = new TaskEAO();

    @Override
    public void contextInitialized(ServletContextEvent arg0) {
        System.out.println("Application is started. The database will be initialized.");
        if (taskEAO.size() ==  0) {
            System.out.println("Adding task 'Paint roof'");
            taskEAO.addTask(new Task("Paint roof",Status.WAITING));
            
            System.out.println("Adding task 'Wash windows'");
            taskEAO.addTask(new Task("Wash windows",Status.ACTIVE));
            
            System.out.println("Adding task 'Wash floor'");
            taskEAO.addTask(new Task("Wash floor",Status.DONE));            
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent arg0) {
        System.out.println("Application was stopped.");
    }

}
