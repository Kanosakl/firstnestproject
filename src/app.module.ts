import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { EasyconfigModule } from "nestjs-easyconfig";
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
@Module({
  imports: [OrdersModule, EasyconfigModule.register({ path: './config/.env', safe: true, sampleFilePath: './.env.sample' })],
  controllers: [AppController, OrdersController],
  providers: [AppService, OrdersService],
})
export class AppModule { }
