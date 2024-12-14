import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamingModule } from './gaming/gaming.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { GamesService } from './gaming/games-service/games.service';
import { ConsoleMediaService } from './gaming/console-media/console-media.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GamingModule,
    // Cahe timings: first request/cold start 31 ms. next requests around 5 to 7 ms.
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, GamesService, ConsoleMediaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
