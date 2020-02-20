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

const easyConfigService = new EasyconfigService(envConfigOption)
@Module({
  imports: [
    OrdersModule,
    EasyconfigModule.register(envConfigOption),
    MongooseModule.forRootAsync({      
      useFactory: async () => ({
        uri: easyConfigService.get('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology:true,
      }),
    }),
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  constructor(private config: EasyconfigService) { }
}
