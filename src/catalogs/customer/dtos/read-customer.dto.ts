import { IsString } from "class-validator";
import { Exclude, Expose, Type } from "class-transformer";

import { ReadBussinessPartnerDTO } from '../../bussiness-partner/dtos/read-bussiness-partner.dto';
import { Status } from '../../../common/status.enum';

@Exclude()
export class ReadCustomerDTO {

    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    customerIdCompany: string;

    @Expose()
    status: Status;

    @Expose()
    @Type( type => ReadBussinessPartnerDTO )
    bussinessPartner: ReadBussinessPartnerDTO

}