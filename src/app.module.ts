import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsModule } from './items/items.module';
import { ItemsService } from './items/items.service';
import { EasyconfigModule } from "nestjs-easyconfig";
import { AuthenticationMiddleware } from './common/authentication.middleware';


@Module({
  imports: [ItemsModule, EasyconfigModule.register({ path: './config/.env', safe: true, sampleFilePath: './.env.sample' })],
  controllers: [AppController, ItemsController],
  providers: [AppService, ItemsService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: '/items', method: RequestMethod.POST },
      )
  }
}
