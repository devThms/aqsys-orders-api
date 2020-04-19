import { Controller, Get, Param, Post, Body, Put, Res, HttpStatus, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';

// DTO's
import { CreateRoleDTO } from './dtos/create-role.dto';

@ApiTags('roles')
@Controller('roles')
export class RoleController {

    /**
     *
     */
    constructor(
        private readonly _roleService: RoleService
    ) { }


    @Get(':id')
    async getRole( @Res() res, @Param('id') id: string ) {

        const role = await this._roleService.get(id);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            role
        });

    }

    @Get()
    async getRoles( @Res() res ) {

        const roles = await this._roleService.getAll();

        res.status(HttpStatus.OK).json({
            roles
        });

    }

    @Post()
    @ApiBody({ type: CreateRoleDTO })
    async createRole( @Res() res, @Body() role: CreateRoleDTO ) {

        const roleCreated = await this._roleService.create(role);

        res.status(HttpStatus.CREATED).json({
            message: 'Role Creado Exitosamente',
            roleCreated
        });

    }

    @Put(':id')
    @ApiBody({ type: CreateRoleDTO })
    async updateRole( @Res() res,  @Param('id') id: string, @Body() role: CreateRoleDTO ) {

        const roleUpdated = await this._roleService.update(id, role);

        res.status(HttpStatus.OK).json({
            message: 'Role Modificado Exitosamente',
            roleUpdated
        });

    }

    @Delete(':id')
    async deleteRole( @Res() res, @Param('id') id: string ) {

        const roleDeleted = await this._roleService.delete(id);

        res.status(HttpStatus.OK).json({
            message: 'Role Eliminado Exitosamente',
            roleDeleted
        });

    }

}
