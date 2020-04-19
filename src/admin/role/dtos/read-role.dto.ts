import { IsString } from 'class-validator';
import { Expose, Type, Exclude } from 'class-transformer';
import { Status } from '../../../common/status.enum';
import { ReadUserDTO } from '../../user/dtos/read-user.dto';

@Exclude()
export class ReadRoleDTO {

    @Expose()
    @IsString()
    readonly id: string;
    
    @Expose()
    @IsString()
      readonly name: string;
    
    @Expose()
    @IsString()
    readonly description: string;
    
    @Expose()
    readonly status: Status;
    
    @Expose()
    @Type(type => ReadUserDTO)
    readonly users: ReadUserDTO[];

}