import { Item } from "../items/item.interface";
import { State } from "./state.interface";
import { Customer } from "src/customers/customer.interface";
export class Order {    
    items: Item[];
    state: State;
    customer: Customer;
}
