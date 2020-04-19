import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BussinessPartnerRepository } from './bussiness-partner.repository';
import { CustomerRepository } from '../customer/customer.repository';
import { TechnicalRepository } from '../technical/technical.repository';

import { BussinessPartnerService } from './bussiness-partner.service';
import { CustomerService } from '../customer/customer.service';

import { BussinessPartnerController } from './bussiness-partner.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BussinessPartnerRepository,
            CustomerRepository,
            TechnicalRepository
        ]),
    ],
    providers: [
        BussinessPartnerService,
        CustomerService
    ],
    controllers: [BussinessPartnerController],
})
export class BussinessPartnerModule {

}
