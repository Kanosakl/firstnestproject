import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from './order.interface';
import { OrderSchema } from "./schemas/order.schema";
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class OrdersService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) { }

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    async create(order: CreateOrderDto) {
        const createdOrder = new OrderSchema({
            items: order.items,
            state: "created",
            email: "test1@test.com" //I'll learn how to implement authentication properly other than using Auth0 and jwt
        });
        return createdOrder.save();
    }
}
