import { Controller, Res, Param, HttpStatus, Get, Post, Body, Put, Delete, Type } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

// DTO's
import { CreateUserDTO } from './dtos/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {

    /**
     *
     */
    constructor(
        private readonly _userService: UserService
    ) { }


    @Get(':id')
    async getUser( @Res() res, @Param('id') id: string ) {

        const user = await this._userService.get(id);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            user
        });

    }

    @Get()
    async getUsers( @Res() res ) {

        const users = await this._userService.getAll();

        res.status(HttpStatus.OK).json({
            users
        });

    }

    @Post()
    @ApiBody({ type: CreateUserDTO })
    async createUser( @Res() res, @Body() user: CreateUserDTO ) {

        const userCreated = await this._userService.create(user);

        res.status(HttpStatus.CREATED).json({
            message: 'User successfully created',
            userCreated
        });

    }


    @Put(':id')
    @ApiBody({ type: CreateUserDTO })
    async updateUser( @Res() res,  @Param('id') id: string, @Body() user: CreateUserDTO ) {

        const userUpdated = await this._userService.update(id, user);

        res.status(HttpStatus.OK).json({
            message: 'User successfully modified',
            userUpdated
        });

    }

    @Put(':id/assign-token')
    async assignToken( @Param('id') id: string , @Body() token: string ): Promise<boolean> {

        return await this._userService.assignToken(id, token);

    }


    @Delete(':id')
    async deleteUser( @Res() res,  @Param('id') id: string ) {

        const userDeleted = await this._userService.delete(id);

        res.status(HttpStatus.OK).json({
            message: 'User successfully removed',
            userDeleted
        });

    }

}
