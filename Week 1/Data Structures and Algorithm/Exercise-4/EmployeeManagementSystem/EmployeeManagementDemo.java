public class EmployeeManagementDemo {

    public static void main(String[] args) {

        EmployeeManagement manager = new EmployeeManagement(10);

        manager.addEmployee( new Employee(101,"John","Manager",80000));
        manager.addEmployee( new Employee(102,"Alice","Developer",60000));
        manager.addEmployee( new Employee(103,"Bob","Tester",50000));

        System.out.println("\nEmployees:");
        manager.displayEmployees();

        System.out.println("\nSearching Employee 102:");

        Employee found = manager.searchEmployee(102);

        if (found != null) {
            System.out.println(found);
        } else {
            System.out.println("Employee Not Found");
        }

        System.out.println("\nDeleting Employee 102:");

        manager.deleteEmployee(102);

        System.out.println("\nEmployees After Deletion:");

        manager.displayEmployees();
    }
}