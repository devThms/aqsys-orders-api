import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
import { compare } from 'bcryptjs';
import { User } from '../user/user.entity';
import { IJwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    /**
     *
     */
    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepo: AuthRepository,
        private readonly _jwtService: JwtService
    ) { }

    async register( user: RegisterDTO ) {

        const { userName, password } = user;

        const userDb: User = await this._authRepo.findOne({
            where: { userName: userName }
        });

        if (userDb) {
            throw new ConflictException('User in use');
        }

        return this._authRepo.register(user);

    }

    async login ( user: LoginDTO ) {

        const { userName, password } = user;

        const userDb: User  = await this._authRepo.findOne({
            where: { userName },
            relations: [ 'role' ]
        });

        if (!userDb) {
            throw new NotFoundException('User not Exists');
        }

        const validatePass = await compare( password, userDb.password );

        if (!validatePass) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: IJwtPayload = { 
            id: userDb.id,
            username: userDb.userName,
            role: userDb.role.name
        }

        const token = await this._jwtService.sign( payload );

        return {
            ok: true,
            message: 'User successfully logged in',
            payload,
            token
        }

    }
}
