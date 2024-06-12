import { Injectable, HttpException, BadRequestException, ForbiddenException, NotAcceptableException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import PrismaService from 'src/util/prisma.service';
import { Request } from 'express';
import * as moment from 'moment';


@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(req: Request) {
    const { date, startDate, endDate } = req.body
    const verifyDate = date.split('/')[2].includes('0') ? date.replace('0', '') : date

    let dayAndStart = moment().set(
      {
        'year': verifyDate.split('/')[2],
        'month': verifyDate.split('/')[1],
        'date': verifyDate.split('/')[0],
        'hour': startDate.split(':')[0],
        'minute': startDate.split(':')[1]
      }).format()

      let dayAndEnd = moment().set({
        'year': verifyDate.split('/')[2],
        'month': verifyDate.split('/')[1],
        'date': verifyDate.split('/')[0],
        'hour': endDate.split(':')[0],
        'minute': endDate.split(':')[1]
      }).format()

      const conflictingSchedules = await this.prisma.events.findMany({
        where: {
          localId: req.body.localId,
          OR: [
            // Caso 1: Novo evento começa antes e termina durante um evento existente
            {
              startDate: {
                lte: dayAndEnd,
              },
              endDate: {
                gte: dayAndStart,
              },
            },
            // Caso 2: Novo evento começa durante e termina depois de um evento existente
            {
              startDate: {
                lte: dayAndEnd,
              },
              endDate: {
                gte: dayAndStart,
              },
            },
            // Caso 3: Novo evento começa e termina durante um evento existente
            {
              startDate: {
                gte: dayAndStart,
              },
              endDate: {
                lte: dayAndEnd,
              },
            },
            // Caso 4: Novo evento envolve completamente um evento existente
            {
              startDate: {
                lte: dayAndStart,
              },
              endDate: {
                gte: dayAndEnd,
              },
            }
          ],
        },
      });

      if (conflictingSchedules.length > 0) {
        throw new NotAcceptableException('Há um conflito de horário ou local.')
      }
        

    return await this.prisma.events.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        date: req.body.date,
        startDate: dayAndStart,
        endDate: dayAndEnd,
        localId: req.body.localId,
        typeId: req.body.typeId,
      }
    })
  }
  async findAll() {
    return await this.prisma.events.findMany({
      take: 5
    })
  }

  async findName(name: string){
    return await this.prisma.locals.findMany({
      where: {
        name: name
      }
    })
  }

  async findOne(id: number) {
    return await this.prisma.events.findUnique({
      where: {
        id: id
      }
    })
  }

  async update(id: number, req: Request) {
    const { date, startDate, endDate } = req.body
    const verifyDate = date.split('/')[2].includes('0') ? date.replace('0', '') : date

    let dayAndStart = moment().set(
      {
        'year': verifyDate.split('/')[2],
        'month': verifyDate.split('/')[1],
        'date': verifyDate.split('/')[0],
        'hour': startDate.split(':')[0],
        'minute': startDate.split(':')[1]
      }).format()

      let dayAndEnd = moment().set({
        'year': verifyDate.split('/')[2],
        'month': verifyDate.split('/')[1],
        'date': verifyDate.split('/')[0],
        'hour': endDate.split(':')[0],
        'minute': endDate.split(':')[1]
      }).format()

    const conflictingSchedules = await this.prisma.events.findMany({
      where: {
        localId: req.body.localId,
        OR: [
          // Caso 1: Novo evento começa antes e termina durante um evento existente
          {
            startDate: {
              lte: dayAndEnd,
            },
            endDate: {
              gte: dayAndStart,
            },
          },
          // Caso 2: Novo evento começa durante e termina depois de um evento existente
          {
            startDate: {
              lte: dayAndEnd,
            },
            endDate: {
              gte: dayAndStart,
            },
          },
          // Caso 3: Novo evento começa e termina durante um evento existente
          {
            startDate: {
              gte: dayAndStart,
            },
            endDate: {
              lte: dayAndEnd,
            },
          },
          // Caso 4: Novo evento envolve completamente um evento existente
          {
            startDate: {
              lte: dayAndStart,
            },
            endDate: {
              gte: dayAndEnd,
            },
          }
        ],
      },
    });

    if (conflictingSchedules.length > 0) {
      throw new NotAcceptableException('Há um conflito de horário ou local.')
    }

    return await this.prisma.events.update({
      where: {
        id: id
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        date: req.body.date,
        startDate: dayAndStart,
        endDate: dayAndEnd,
        localId: req.body.localId,
        typeId: req.body.typeId,
      }
    })
  }

  async remove(id: number) {
    return await this.prisma.events.delete({
      where: {
        id: id
      }
    })
  }

}

