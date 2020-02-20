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

    async cancel(orderId: string) {
        return this.orderModel.findOneAndUpdate(
            { id: orderId },
            { state: "canceled" }
        )
            .exec()
            .catch(function (err) {
                console.error(err);
                return err;
            })
    }

    async paymentCallback(orderId: string, transaction: any) {
        //assume result = true false, it's a mock, eh?
        if (!transaction || !transaction.result) {
            return this.decline(orderId);
        }

        return this.confirm(orderId);
    }

    private async confirm(orderId: string) {
        const result = this.orderModel.findOneAndUpdate(
            { id: orderId },
            { state: "confirmed" }
        ).exec();

        setTimeout(() => {
            this.orderModel.findOneAndUpdate(
                {
                    id: orderId,
                    state: { $ne: "canceled" }
                },
                { state: "delivered" }
            ).exec()
        }, 1000 * Math.floor(Math.random() * Math.floor(2))
        );

        return result;
    }

    private async decline(orderId: string) {
        return this.orderModel.findOneAndUpdate(
            { id: orderId },
            { state: "declined" }
        ).exec();
    }
}
