import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import PrismaService from 'src/util/prisma.service';

@Module({
  controllers: [TypesController],
  providers: [TypesService, PrismaService],
})
export class TypesModule {}
