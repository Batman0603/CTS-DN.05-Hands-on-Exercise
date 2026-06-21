public class ECommerceSearchDemo {
    public static void main(String[] args){
        Product[] products = {
            new Product(101, "Laptop" , "Electronics"),
            new Product(102, "Mobile", "Electronics"),
            new Product(103, "Shoes", "Fashion"),
            new Product(104, "Watch", "Accessories"),
            new Product(105, "Keyboard", "Electronics")

        };
        int searchId = 104 ;

        System.out.println("LINEAR SEARCH");

        Product LinearResult = LinearSearch.search(products , searchId);
        if(LinearResult != null) {
            System.out.println("Product Found ");
            System.out.println(LinearResult);
        } else {
            System.out.println("Product Not Found");
        }

        System.out.println();

        System.out.println("BINARY SEARCH");
        Product binaryResult = BinarySearch.search(products,searchId);
        if(binaryResult != null) {
            System.out.println("Product Found ");
            System.out.println(binaryResult);
        } else {
            System.out.println("Product Not Found");    
        }
    }
}