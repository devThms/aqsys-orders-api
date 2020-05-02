import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';

import { Role } from '../../role/role.entity';

export class CreateUserDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly userName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @Type( type => Role)
    @IsNotEmpty()
    readonly role: Role;


}