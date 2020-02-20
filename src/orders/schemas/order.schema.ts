import {Schema} from "mongoose";

export const OrderSchema = new Schema({
    items: [{
        id: Number,
        quantity: Number,
    }],
    state: String,
    email: String,
})