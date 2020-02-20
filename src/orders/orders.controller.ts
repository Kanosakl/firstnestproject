import { Controller, Get, Post, Body, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import fetch from "node-fetch";

import { OrdersService } from './orders.service';
import { Order } from './order.interface';
import { CreateOrderDto } from './create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) { }

    @Get()
    async findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @HttpCode(201)
    async create(@Body('order') order: CreateOrderDto) {
        return this.orderService.create(order);
    }

    @Post('cancel')
    async cancel(@Body('orderId') orderId: string) {
        return this.orderService.cancel(orderId);
    }

    @Post('payment')
    async paymentCallback(@Body('orderId') orderId: string, @Body('transaction') transaction: any) {
        /*
        const transaction = await fetch(`${paymentAPI}/orderId=${orderId}`)        
        */
       
        const mockTransaction = !!(Math.floor(Math.random() * Math.floor(2)) % 2);
        return this.orderService.paymentCallback(orderId, mockTransaction);
    }
}
