import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { Status } from '../../common/status.enum';

//DTO's
import { CreateUserDTO } from './dtos/create-user.dto';
import { ReadUserDTO } from './dtos/read-user.dto';

import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {

    /**
     *
     */
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
    ) { } 


    async get(id: string): Promise<ReadUserDTO> {

        if(!id) {
            throw new BadRequestException('No fue enviado el ID del recurso')
        }

        const user: User = await this._userRepository.findOne( id, {
            where: { status: Status.ACTIVE },
            relations: ['role']
        });

        if (!user) {
            throw new NotFoundException('No se encontro el Usuario solicitado')
        }

        // return this._mapperService.map<User, UserDTO>( user, new UserDTO() );
        return plainToClass(ReadUserDTO, user);

    }


    async getAll(): Promise<ReadUserDTO[]> {

        const users: User[] = await this._userRepository.find({
            where: { status: Status.ACTIVE },
            relations: ['role']
        });

        // return this._mapperService.mapCollection<User, UserDTO>( users, new UserDTO() );
        return users.map((user: User) => plainToClass(ReadUserDTO, user));

    }

    async create( user: CreateUserDTO ): Promise<ReadUserDTO> {

        const userCreated = await this._userRepository.save(user);

        // return this._mapperService.map<User, UserDTO>( userCreated, new UserDTO() );
        return plainToClass(ReadUserDTO, userCreated);

    }


    async update( id: string, user: CreateUserDTO ): Promise<ReadUserDTO> {

        if(!id) {
            throw new BadRequestException('No fue enviado el ID del recurso')
        }

        const userDb: User = await this._userRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        if (!userDb) {
            throw new NotFoundException('No se encontro el Usuario solicitado')
        }

        await this._userRepository.update(id, user)

        const userUpdate = await this._userRepository.findOne(id);

        // return this._mapperService.map<User, UserDTO>( userUpdate, new UserDTO() );
        return plainToClass(ReadUserDTO, userUpdate);

    }


    async delete( id: string ): Promise<ReadUserDTO> {

        if(!id) {
            throw new BadRequestException('No fue enviado el ID del recurso')
        }

        const userDb: User = await this._userRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        if (!userDb) {
            throw new NotFoundException('No se encontro el Usuario solicitado')
        }

        await this._userRepository.update(id, {
            status: Status.INACTIVE
        });

        const userDeleted = await this._userRepository.findOne(id);

        // return this._mapperService.map<User, UserDTO>( userDeleted, new UserDTO() );
        return plainToClass(ReadUserDTO, userDeleted);

    }

    async assignToken( id: string, token: string ): Promise<boolean> {

        if (!id) {
            throw new BadRequestException('the resource ID was not sent')
        }

        if (!token) {
            throw new BadRequestException('the token device was not sent')
        }

        const userDb: User = await this._userRepository.findOne(id);

        if (!userDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        userDb.deviceToken = token;

        await userDb.save();

        return true;

    }

}
