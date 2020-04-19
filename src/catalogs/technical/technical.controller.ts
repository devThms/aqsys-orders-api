import { Controller, Res, Param, HttpStatus, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { TechnicalService } from './technical.service';
import { ApiTags } from '@nestjs/swagger';

// DTO's
import { CreateTechnicalDTO } from './dtos/create-technical.dto';

@ApiTags('technicians')
@Controller('technicians')
export class TechnicalController {

    /**
     *
     */
    constructor(
        private readonly _technicalService: TechnicalService
    ) { }

    @Get(':id')
    async getTechnical(@Res() res, @Param('id') id: string ) {

        const technical = await this._technicalService.get(id);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            technical
        });

    }

    @Get()
    async getTechnicians(@Res() res) {

        const technicians = await this._technicalService.getAll();

        res.status(HttpStatus.OK).json({
            technicians
        });

    }

    @Post()
    async createTechnical(@Res() res, @Body() technical: CreateTechnicalDTO) {

        const technicalCreated = await this._technicalService.create(technical);

        res.status(HttpStatus.CREATED).json({
            message: 'OK',
            technicalCreated
        });

    }

    @Put(':id')
    async updateTechnical(@Res() res, @Param('id') id: string, @Body() technical: CreateTechnicalDTO) {

        const technicalUpdated = await this._technicalService.update(id, technical);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            technicalUpdated
        });

    }

    @Delete(':id')
    async deleteTechnical(@Res() res, @Param('id') id: string) {

        const technicalDeleted = await this._technicalService.delete(id);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            technicalDeleted
        });
        
    }
}
