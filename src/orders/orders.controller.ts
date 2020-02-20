import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.interface';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @Get()
    async findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }
}
