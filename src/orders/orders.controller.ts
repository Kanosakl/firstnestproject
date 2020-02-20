import { Controller, Get, Post, Body, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
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
    async createOrder(@Body('order') order: CreateOrderDto) {
        return this.orderService.create(order);
    }
}
