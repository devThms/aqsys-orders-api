import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RoleRepository } from './role.repository';
import { Role } from './role.entity';
import { Status } from '../../common/status.enum';

// DTO's Role
import { CreateRoleDTO } from './dtos/create-role.dto';
import { ReadRoleDTO } from './dtos/read-role.dto';

import { plainToClass } from 'class-transformer';

@Injectable()
export class RoleService {

    /**
     *
     */
    constructor( 
        @InjectRepository(RoleRepository) 
        private readonly _roleRepository: RoleRepository,
    ) { }


    async get(id: string): Promise<ReadRoleDTO> {

        if(!id) {
            throw new BadRequestException('No fue enviado el ID del recurso')
        }

        const role: Role = await this._roleRepository.findOne( id, {
            where: { status: Status.ACTIVE },
            relations: ['users']
        });

        if (!role) {
            throw new NotFoundException('No se encontro el Role solicitado')
        }

        // return this._mapperService.map<Role, RoleDTO>( role, new RoleDTO() );
        return plainToClass(ReadRoleDTO, role);

    }

    async getAll(): Promise<ReadRoleDTO[]> {

        const roles: Role[] = await this._roleRepository.find({
            where: { status: Status.ACTIVE },
            relations: ['users']
        });

        // return this._mapperService.mapCollection<Role, RoleDTO>( roles, new RoleDTO() );
        return roles.map((role: Role) => plainToClass(ReadRoleDTO, role));

    }

    async create( role: CreateRoleDTO ): Promise<ReadRoleDTO> {

        const roleCreated = await this._roleRepository.save(role);

        // return this._mapperService.map<Role, RoleDTO>( roleCreated, new RoleDTO() );
        return plainToClass(ReadRoleDTO, roleCreated);

    }

    async update( id: string, role: CreateRoleDTO ): Promise<ReadRoleDTO> {

        if(!id) {
            throw new BadRequestException('No fue enviado el ID del recurso')
        }

        const roleDb: Role = await this._roleRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        if (!roleDb) {
            throw new NotFoundException('No se encontro el Role solicitado')
        }

        await this._roleRepository.update(id, role)

        const roleUpdate = await this._roleRepository.findOne(id);

        // return this._mapperService.map<Role, RoleDTO>( roleUpdate, new RoleDTO() );
        return plainToClass(ReadRoleDTO, roleUpdate);

    }

    async delete( id: string ): Promise<ReadRoleDTO> {

        if(!id) {
            throw new BadRequestException('No fue enviado el ID del recurso')
        }

        const roleDb: Role = await this._roleRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        if (!roleDb) {
            throw new NotFoundException('No se encontro el Role solicitado')
        }

        await this._roleRepository.update(id, {
            status: Status.INACTIVE
        });

        const roleDeleted = await this._roleRepository.findOne(id);

        // return this._mapperService.map<Role, RoleDTO>( roleDeleted, new RoleDTO() );
        return plainToClass(ReadRoleDTO, roleDeleted);

    }

}
