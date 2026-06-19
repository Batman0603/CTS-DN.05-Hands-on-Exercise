class Logger {
    private static Logger instance;

    private Logger(){
        System.out.println("Logger Instance created ");
    }

    public static Logger getInstance(){
        if(instance==null){
            instance = new Logger();
        }
        return instance ;
    }

    public void log(String message){
        System.out.println("[LOG]"+message);
    }
}

public class SingletonPatternExample{
    public static void main(String args[]){
Logger logger1 = Logger.getInstance();
Logger logger2 = Logger.getInstance();

logger1.log("Application started");
logger2.log("User logged in");

System.out.println("logger1 hashcode : "+logger1.hashCode());
System.out.println("logger2 hashcode : "+logger2.hashCode());

if(logger1 == logger2){
    System.out.println("Only one Logger instance exists. ");
}
else{
    System.out.println("Different Logger instances exist. ");
    }

    }
}