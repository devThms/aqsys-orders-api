import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { BussinessPartner } from '../../bussiness-partner/bussiness-partner.entity';

export class CreateCustomerDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    customerIdCompany: string;

    // @ApiProperty()
    @Type( type => BussinessPartner )
    @IsNotEmpty()
    bussinessPartner: BussinessPartner


}