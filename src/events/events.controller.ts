import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { EventsService } from './events.service';
import { Request, RequestHandler, Response } from 'express';
import { Prisma } from '@prisma/client';
import { CreateLocalDto } from 'src/locals/dto/create-local.dto';
import { ApiResponse } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  async create(@Req() req: Request, @Res() res: Response,@Body() createLocalDto: CreateLocalDto) {
    try{
      const response = await this.eventsService.create(req)
      return res.status(201).json(response)
    }catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException('Something bad happened', { cause: new Error(), description:  'Ja existe um tipo com o mesmo nome'})
        }
      }
      throw e
    }
    
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Post('/findName')
  async findName(@Body() createEventDto: CreateEventDto, @Req() req: Request){
    const {name} = req.body
    return this.eventsService.findName(name)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    return this.eventsService.update(+id, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
