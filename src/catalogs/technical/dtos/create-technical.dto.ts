import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BussinessPartner } from '../../bussiness-partner/bussiness-partner.entity';
import { Type } from 'class-transformer';

export class CreateTechnicalDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    technicalIdCompany: string;

    @Type( type => BussinessPartner )
    @IsNotEmpty()
    bussinessPartner: BussinessPartner

}