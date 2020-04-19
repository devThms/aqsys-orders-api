import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Entities Models
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';

// DTO's
import { ReadOrderDTO } from './dtos/read-order.dto';
import { CreateOrderDTO } from './dtos/create-order.dto';

import { Status } from '../../common/status.enum';
import { plainToClass } from 'class-transformer';

@Injectable()
export class OrderService {

    /**
     *
     */
    constructor(
        @InjectRepository(OrderRepository)
        private readonly _orderRepository: OrderRepository
    ) { }

    async get( id: string ): Promise<ReadOrderDTO> {

        if(!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const order: Order = await this._orderRepository.findOne( id, {
            where: { status: Status.ACTIVE },
            relations: [
                'user',
                'customer', 'customer.bussinessPartner', 
                'technical', 'technical.bussinessPartner'
            ]
        } );

        if (!order) {
            throw new NotFoundException('The requested resource was not found')
        }

        return plainToClass(ReadOrderDTO, order);

    }

    async getAll(): Promise<ReadOrderDTO[]> {

        const orders: Order[] = await this._orderRepository.find({
            where: { status: Status.ACTIVE },
            relations: [
                'user',
                'customer', 'customer.bussinessPartner',
                'technical', 'technical.bussinessPartner'
            ]
        });

        return orders.map((order: Order) => plainToClass(ReadOrderDTO, order));

    }

    async create( order: CreateOrderDTO ): Promise<ReadOrderDTO> {

        const orderCreated = await this._orderRepository.save(order);

        return plainToClass(ReadOrderDTO, orderCreated);

    }

    async update( id: string, order: CreateOrderDTO ): Promise<ReadOrderDTO> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const orderDb: Order = await this._orderRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: [
                'user',
                'customer', 'customer.bussinessPartner',
                'technical', 'technical.bussinessPartner'
            ]
        });

        if (!orderDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this._orderRepository.update( id, order );

        const orderUpdated = await this._orderRepository.findOne(id);

        return plainToClass(ReadOrderDTO, orderUpdated);

    }

    async delete( id: string ): Promise<ReadOrderDTO> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const orderDb: Order = await this._orderRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: [
                'user', 'user.role',
                'customer', 'customer.bussinessPartner',
                'technical', 'technical.bussinessPartner'
            ]
        });

        if (!orderDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this._orderRepository.update( id, {
            status: Status.INACTIVE
        } );

        const orderDeleted = await this._orderRepository.findOne(id);

        return plainToClass(ReadOrderDTO, orderDeleted);
        
    }

}
