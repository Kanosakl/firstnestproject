import {Schema} from "mongoose";

export const OrderSchema = new Schema({
    items: [{
        id: String,
        quantity: Number,
    }],
    state: String,
    email: String,
})