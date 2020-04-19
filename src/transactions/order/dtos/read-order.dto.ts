import { Exclude, Expose, Type } from "class-transformer";
import { IsString, IsDate, IsNumber } from "class-validator";

// Reads - DTO's
import { ReadUserDTO } from '../../../admin/user/dtos/read-user.dto';
import { ReadCustomerDTO } from '../../../catalogs/customer/dtos/read-customer.dto';
import { ReadTechnicalDTO } from '../../../catalogs/technical/dtos/read-technical.dto';

import { Status } from '../../../common/status.enum';

@Exclude()
export class ReadOrderDTO {

    @Expose()
    @IsString()
    readonly id: string;

    @Expose()
    @IsDate()
    readonly creationDate: Date;

    @Expose()
    @IsDate()
    readonly executionDate: Date;

    @Expose()
    @IsNumber()
    readonly dayOfService: number;

    @Expose()
    @IsString()
    readonly theoryDescription: string;

    @Expose()
    @IsString()
    readonly realDescription: string;

    @Expose()
    @IsString()
    readonly technicalObservation: string;

    @Expose()
    @IsString()
    readonly customerObservation: string;

    @Expose()
    @IsNumber()
    readonly ammount: number;

    @Expose()
    status: Status;

    @Expose()
    @Type( type => ReadUserDTO )
    readonly user: ReadUserDTO;

    @Expose()
    @Type( type => ReadCustomerDTO )
    readonly customer: ReadCustomerDTO;

    @Expose()
    @Type( type => ReadTechnicalDTO )
    readonly technical: ReadTechnicalDTO;

}