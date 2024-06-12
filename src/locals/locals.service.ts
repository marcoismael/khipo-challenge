import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { Prisma } from '@prisma/client';
import PrismaService from 'src/util/prisma.service';

@Injectable()
export class LocalsService {

  constructor(
    private readonly prisma: PrismaService
  ) { }
  async create(createLocalDto: CreateLocalDto) {
    try {
      return await this.prisma.locals.create({
        data: createLocalDto
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Something bad happened', { cause: new Error(), description: `Cnpj existente` })
        }
        if (error.code === 'P2003') {
          throw new BadRequestException('Something bad happened', { cause: new Error(), description: `Tipo não existe` })
        }
      }
      throw error
    }
  }

  async findAll() {
    return await this.prisma.locals.findMany({
      take: 5
    })
  }

  async findOne(id: number) {
    return await this.prisma.locals.findUnique({
      where:
      {
        id: id
      }
    })
  }

  async findName(name: string){
    return await this.prisma.locals.findMany({
      where: {
        name: name
      }
    })
  }

  async update(id: number, updateLocalDto: UpdateLocalDto) {
    return await this.prisma.locals.update({
      where: {
        id: id
      },
      data: updateLocalDto
    })
  }

  async remove(id: number) {
    return await this.prisma.locals.delete({
      where: {
        id: id
      }
    })
  }
}
