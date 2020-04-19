import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

import { ReadCustomerDTO } from '../../customer/dtos/read-customer.dto';
import { ReadTechnicalDTO } from '../../technical/dtos/read-technical.dto';
import { Status } from '../../../common/status.enum';

@Exclude()
export class ReadBussinessPartnerDTO {

    @Expose()
    @IsString()
    readonly id: string;

    @Expose()
    @IsString()
    readonly firstName: string;

    @Expose()
    @IsString()
    readonly lastName: string;

    @Expose()
    @IsString()
    readonly nit: string;

    @Expose()
    @IsString()
    readonly direction: string;

    @Expose()
    @IsNumber()
    readonly telephone: number;

    @Expose()
    readonly status: Status;

    @Expose()
    @Type( type => ReadCustomerDTO )
    customer: ReadCustomerDTO;

    @Expose()
    @Type( type => ReadTechnicalDTO )
    technical: ReadTechnicalDTO;


}