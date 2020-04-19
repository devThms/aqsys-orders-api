import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Entities Models
import { TechnicalRepository } from './technical.repository';
import { Technical } from './technical.entity';

// DTO's
import { CreateTechnicalDTO } from './dtos/create-technical.dto';
import { ReadTechnicalDTO } from './dtos/read-technical.dto';

import { Status } from '../../common/status.enum';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TechnicalService {

    /**
     *
     */
    constructor(
        @InjectRepository(TechnicalRepository)
        private readonly _technicalRepository: TechnicalRepository
    ) { }

    async get( id: string ): Promise<ReadTechnicalDTO> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const technical: Technical = await this._technicalRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['bussinessPartner']
        });

        if (!technical) {
            throw new NotFoundException('The requested resource was not found')
        }

        return plainToClass(ReadTechnicalDTO, technical);
        
    }

    async getAll(): Promise<ReadTechnicalDTO[]> {

        const technicians: Technical[] = await this._technicalRepository.find({
            where: { status: Status.ACTIVE },
            relations: ['bussinessPartner']
        });

        return technicians.map((technical: Technical) => plainToClass(ReadTechnicalDTO, technical));
    }

    async create( technical: CreateTechnicalDTO ): Promise<ReadTechnicalDTO> {

        const technicalCreated = await this._technicalRepository.save(technical);

        return plainToClass(ReadTechnicalDTO, technical);

    }

    async update( id: string, technical: CreateTechnicalDTO ): Promise<ReadTechnicalDTO> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const technicalDb: Technical = await this._technicalRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['bussinessPartner']
        });

        if (!technicalDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        return plainToClass(ReadTechnicalDTO, technical);

    }

    async delete( id: string ): Promise<ReadTechnicalDTO> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        const technicalDb: Technical = await this._technicalRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['bussinessPartner']
        });

        if (!technicalDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this._technicalRepository.update(id, {
            status: Status.INACTIVE
        });

        const technicalDeleted = await this._technicalRepository.findOne(id);

        return plainToClass(ReadTechnicalDTO, technicalDeleted);

    }
}
