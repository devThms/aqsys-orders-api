import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BussinessPartnerRepository } from './bussiness-partner.repository';
import { BussinessPartner } from './bussiness-partner.entity';
import { CustomerRepository } from '../customer/customer.repository';
import { Customer } from '../customer/customer.entity';
import { TechnicalRepository } from '../technical/technical.repository';
import { Technical } from '../technical/technical.entity';

// DTO's
import { ReadBussinessPartnerDTO } from './dtos/read-bussiness-partner.dto';
import { CreateBussinessPartnerDTO } from './dtos/create-bussiness-partner.dto';
import { ReadCustomerDTO } from '../customer/dtos/read-customer.dto';

import { Status } from '../../common/status.enum';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BussinessPartnerService {

    /**
     *
     */
    constructor(
        @InjectRepository(BussinessPartnerRepository)
        private readonly _bussinessPartnerRepository: BussinessPartnerRepository,
        @InjectRepository(CustomerRepository)
        private readonly _customerRepository: CustomerRepository,
        @InjectRepository(TechnicalRepository)
        private readonly _technicalRepository: TechnicalRepository
    ) { }

    async get(id: string): Promise<ReadBussinessPartnerDTO> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const bp: BussinessPartner = await this._bussinessPartnerRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['customer', 'technical']
        });

        if (!bp) {
            throw new NotFoundException('The requested resource was not found')
        }
        
        // Set null status = 'INACTIVE'
		if (bp.customer.status === Status.INACTIVE) {
			bp.customer = null;
		}
		
		if (bp.technical.status === Status.INACTIVE) {
			bp.technical = null;
		}

        return plainToClass(ReadBussinessPartnerDTO, bp);
        
    }

    async getCustomerById(id: string): Promise<ReadCustomerDTO> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const customer: Customer[] = await this._customerRepository.find({
            where: { bussinessPartner: id }
        });
       
        return plainToClass(ReadCustomerDTO, customer[0]);

    }

    async getTechnicalById(id: string): Promise<ReadCustomerDTO> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const technical: Technical[] = await this._technicalRepository.find({
            where: { bussinessPartner: id }
        });

        return plainToClass(ReadCustomerDTO, technical[0]);

    }

    async getAll( all: string ): Promise<ReadBussinessPartnerDTO[]> {

        let bps: BussinessPartner[];

        if (!all) {
            bps = await this._bussinessPartnerRepository.find({
                where: { status: Status.ACTIVE },
                relations: ['customer', 'technical']
            });
        }
       else {
           if (all === 'true') {
               bps = await this._bussinessPartnerRepository.find({
                   relations: ['customer', 'technical']
               });
           } else {
                bps = await this._bussinessPartnerRepository.find({
                    where: { status: Status.ACTIVE },
                    relations: ['customer', 'technical']
                });
            }
        }

        // Set null status = 'INACTIVE'
        bps.map((bp: BussinessPartner) => {

            if (bp.customer) {
                if (bp.customer.status === Status.INACTIVE) {
                    bp.customer = null;
                }
            }

            if (bp.technical) {
                if (bp.technical.status === Status.INACTIVE) {
                    bp.technical = null;
                }
            }
            
        });
		
       
        return bps.map((bp: BussinessPartner) => plainToClass(ReadBussinessPartnerDTO, bp));

    }

    async create( bp: CreateBussinessPartnerDTO ): Promise<ReadBussinessPartnerDTO> {

        const bpCreated = await this._bussinessPartnerRepository.save(bp);

        return plainToClass(ReadBussinessPartnerDTO, bpCreated);

    }

    async update( id: string, bp: CreateBussinessPartnerDTO ): Promise<ReadBussinessPartnerDTO> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const bpDb: BussinessPartner = await this._bussinessPartnerRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['customer']
        });

        if (!bpDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this._bussinessPartnerRepository.update(id, bp);

        const bpUpdate = await this._bussinessPartnerRepository.findOne(id);

        return plainToClass(ReadBussinessPartnerDTO, bpUpdate);

    }

    async delete( id: string ): Promise<ReadBussinessPartnerDTO> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const bpDb: BussinessPartner = await this._bussinessPartnerRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['customer']
        });

        if (!bpDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this._bussinessPartnerRepository.update(id, {
            status: Status.INACTIVE
        });

        const bpDeleted = await this._bussinessPartnerRepository.findOne(id);

        return plainToClass(ReadBussinessPartnerDTO, bpDeleted);

    }

}
