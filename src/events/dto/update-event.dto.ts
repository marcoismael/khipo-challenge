import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    @ApiProperty({
        description:''
    })
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    date: string

    @ApiProperty()
    @IsString()
    startDate: string

    @ApiProperty()
    @IsString()
    endDate: string

    @ApiProperty()
    @IsNumber()
    localId: number;

    @ApiProperty()
    @IsString()
    typeId: number;
}
