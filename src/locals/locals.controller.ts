import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Req } from '@nestjs/common';
import { LocalsService } from './locals.service';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { Request } from 'express';

@Controller('locals')
export class LocalsController {
  constructor(private readonly localsService: LocalsService) { }

  @Post()
  create(@Body() createLocalDto: CreateLocalDto) {
    return this.localsService.create(createLocalDto);
  }

  @Post('/findName')
  async findName(@Body() createLocalDto: CreateLocalDto, @Req() req: Request){
    const {name} = req.body
    return this.localsService.findName(name)
  }

  @Get()
  findAll() {
    return this.localsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocalDto: UpdateLocalDto) {
    return this.localsService.update(+id, updateLocalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localsService.remove(+id);
  }
}
