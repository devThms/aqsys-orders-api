import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Entities Models
import { CustomerRepository } from './customer.repository';
import { Customer } from './customer.entity';

// DTO's
import { ReadCustomerDTO } from './dtos/read-customer.dto';
import { CreateCustomerDTO } from './dtos/create-customer.dto';


import { Status } from '../../common/status.enum';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomerService {

    /**
     *
     */
    constructor(
        @InjectRepository(CustomerRepository)
        private readonly _customerRepository: CustomerRepository
    ) { }

    async get(id: string): Promise<ReadCustomerDTO> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const customer: Customer = await this._customerRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['bussinessPartner']
        });

        if (!customer) {
            throw new NotFoundException('The requested resource was not found')
        }

        return plainToClass(ReadCustomerDTO, customer);

    }

    async getAll(): Promise<ReadCustomerDTO[]> {

        const customers: Customer[] = await this._customerRepository.find({
            where: { status: Status.ACTIVE },
            relations: ['bussinessPartner']
        });

        return customers.map((customer: Customer) => plainToClass(ReadCustomerDTO, customer));

    }

    async create( customer: CreateCustomerDTO ): Promise<ReadCustomerDTO> {
    
        const customerCreated = await this._customerRepository.save(customer);

        return plainToClass(ReadCustomerDTO, customerCreated);

    }

    async update( id: string, customer: CreateCustomerDTO ): Promise<ReadCustomerDTO> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const customerDb: Customer = await this._customerRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['bussinessPartner']
        });

        if (!customerDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this._customerRepository.update(id, customer);

        const customerUpdate = await this._customerRepository.findOne(id);

        return plainToClass(ReadCustomerDTO, customerUpdate);

    }

    async delete( id: string ): Promise<ReadCustomerDTO> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const customerDb: Customer = await this._customerRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['bussinessPartner']
        });

        if (!customerDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this._customerRepository.update(id, {
            status: Status.INACTIVE
        });

        const customerDeleted = await this._customerRepository.findOne(id);

        return plainToClass(ReadCustomerDTO, customerDeleted);

    }

}
