import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNumber } from "class-validator";

export class CreateTypeDto {
    @ApiProperty()
    @IsString()
    name: string;
}
