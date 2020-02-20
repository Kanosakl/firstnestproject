import { Item } from "../items/item.interface";
import { Customer } from "src/customers/customer.interface";
export class Order {    
    items: Item[];
    state: string;
    customer: Customer;
}
