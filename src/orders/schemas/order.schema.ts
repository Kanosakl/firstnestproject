import {Schema} from "mongoose";

export const OrderSchema = new Schema({
    items: [{
        name: String,
        price: Number,
    }],
    state: String,
    customer: {
        username: String,
        email: String
    },
})