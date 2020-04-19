import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBussinessPartnerDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly nit: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly direction: string;

    @ApiProperty()
    @IsNumber()
    readonly telephone: number;


}