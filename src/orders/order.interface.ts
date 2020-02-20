import { Item } from "../items/item.interface";
import { State } from "./state.interface";
export class Order {
    items: Item[];
    state: State;
}
