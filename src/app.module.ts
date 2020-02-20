import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { EasyconfigModule, EasyconfigService } from "nestjs-easyconfig";
import { MongooseModule } from "@nestjs/mongoose";

const envConfigOption = { 
  path: './config/.env', 
  safe: true, 
  sampleFilePath: './.env.sample' 
};

@Module({
  imports: [
    OrdersModule,
    EasyconfigModule.register(envConfigOption),
    MongooseModule.forRootAsync({      
      imports: [EasyconfigModule.register(envConfigOption)],
      useFactory: async (config: EasyconfigService) => ({
        uri: config.get('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology:true,
      }),
      inject: [EasyconfigService]
    }),
  ],
  
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { 
}
