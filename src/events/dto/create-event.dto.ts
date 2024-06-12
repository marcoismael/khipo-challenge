import { ApiProperty, ApiResponse } from "@nestjs/swagger";
import { IsEmail, IsString, IsNumber } from "class-validator";


export class CreateEventDto {
    @ApiProperty()
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
    date: string;

    @ApiProperty()
    @IsString()
    startDate: string;

    @ApiProperty()
    @IsString()
    endDate: string;

    @ApiProperty()
    @IsNumber()
    localId: number;

    @ApiProperty()
    @IsString()
    typeId: number;
}
