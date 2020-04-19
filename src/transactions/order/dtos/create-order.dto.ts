import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// Model-Relations
import { User } from '../../../admin/user/user.entity';
import { Customer } from '../../../catalogs/customer/customer.entity';
import { Technical } from '../../../catalogs/technical/technical.entity';


export class CreateOrderDTO {

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    readonly creationDate: Date;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    readonly executionDate: Date;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly dayOfService: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly theoryDescription: string;

    @ApiProperty()
    @IsString()
    readonly realDescription: string;

    @ApiProperty()
    @IsString()
    readonly technicalObservation: string;

    @ApiProperty()
    @IsString()
    readonly customerObservation: string;

    @ApiProperty()
    @IsNumber()
    readonly ammount: number;

    @Type( type => User )
    @IsNotEmpty()
    readonly user: User;

    @Type( type => Customer )
    @IsNotEmpty()
    readonly customer: Customer;

    @Type( type => Technical )
    @IsNotEmpty()
    readonly technical: Technical;

}