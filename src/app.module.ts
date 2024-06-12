import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocalsModule } from './locals/locals.module';
import { EventsModule } from './events/events.module';
import { EventsService } from './events/events.service';
import { LocalsService } from './locals/locals.service';
import { ConfigModule } from '@nestjs/config';
import PrismaService from './util/prisma.service';
import { TypesModule } from './types/types.module';

@Module({
  imports: [
    LocalsModule, 
    EventsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypesModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsService, LocalsService,PrismaService],
})
export class AppModule {}
