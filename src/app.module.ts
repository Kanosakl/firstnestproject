import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EasyconfigModule } from "nestjs-easyconfig";
@Module({
  imports: [EasyconfigModule.register({ path: './config/.env', safe: true, sampleFilePath: './.env.sample' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
