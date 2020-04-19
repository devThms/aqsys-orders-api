import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerRepository]),
    ],
    providers: [CustomerService],
    controllers: [CustomerController]
})
export class CustomerModule {

}
