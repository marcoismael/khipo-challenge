import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNumber, IsString} from 'class-validator'

export class CreateLocalDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsString()
    surname: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    cnpj: string;

    @ApiProperty()
    @IsNumber()
    typeId: number;

    @ApiProperty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    state: string;

    @ApiProperty()
    @IsString()
    zcode: string;

    @ApiProperty()
    @IsString({each: true})
    gates: string[];

    @ApiProperty()
    @IsString({each: true})
    ticketGate: string[];
}
