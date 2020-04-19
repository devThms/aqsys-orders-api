import { Exclude, Expose, Type } from "class-transformer";
import { IsString } from "class-validator";

import { ReadBussinessPartnerDTO } from '../../bussiness-partner/dtos/read-bussiness-partner.dto';
import { Status } from '../../../common/status.enum';

@Exclude()
export class ReadTechnicalDTO {

    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    technicalIdCompany: string;

    @Expose()
    status: Status;

    @Expose()
    @Type( type => ReadBussinessPartnerDTO )
    bussinessPartner: ReadBussinessPartnerDTO;

}