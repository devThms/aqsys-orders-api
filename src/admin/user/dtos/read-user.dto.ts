import { IsString } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';

import { ReadRoleDTO } from '../../role/dtos/read-role.dto';
import { Status } from '../../../common/status.enum';

@Exclude()
export class ReadUserDTO {

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
    readonly userName: string;

    @Expose()
    readonly status: Status;

    @Expose()
    @Type(type => ReadRoleDTO)
    readonly role: ReadRoleDTO;
    
}