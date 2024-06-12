import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import PrismaService from 'src/util/prisma.service';
import { Prisma } from '@prisma/client';
Prisma

@Injectable()
export class TypesService {
  constructor(
    private readonly prisma: PrismaService
  ){}
  async create(createTypeDto: CreateTypeDto) {
    try{
      return await this.prisma.type.create({
        data: createTypeDto
      })
    }catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException('Something bad happened', { cause: new Error(), description:  'Ja existe um tipo com o mesmo nome'})
        }
      }
      throw e
    }
    
  }

  async findAll() {
    return await this.prisma.type.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.type.findUnique({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    return this.prisma.type.update({
      where: {
        id
      },
      data: {
        name: updateTypeDto.name
      }
    })
  }

  async remove(id: number) {
    return await this.prisma.type.delete({
      where: {
        id: id
      }
    })
  }
}
