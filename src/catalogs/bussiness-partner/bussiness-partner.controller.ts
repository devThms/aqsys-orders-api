import { Controller, Get, Res, Param, HttpStatus, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { BussinessPartnerService } from './bussiness-partner.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';

// DTO's
import { CreateBussinessPartnerDTO } from './dtos/create-bussiness-partner.dto';

@ApiTags('bussiness-partners')
@Controller('bussiness-partners')
export class BussinessPartnerController {

    /**
     *
     */
    constructor(
        private readonly _bussinessPartnerService: BussinessPartnerService
    ) { }

    @Get(':id')
    async getBussinessPartner(@Res() res, @Param('id') id: string) {

        const bp = await this._bussinessPartnerService.get(id);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            bp
        });

    }

    @Get(':id/customer')
    async getCustomerById(@Res() res, @Param('id') id: string) {

        const customer = await this._bussinessPartnerService.getCustomerById(id);

        if (!customer) {
            res.status(HttpStatus.OK).json({
                message: 'NotExists'
            });
        } else {
            res.status(HttpStatus.OK).json({
                message: 'OK',
                customer
            });
        }
        
    }

    @Get(':id/technical')
    async getTechnicalById(@Res() res, @Param('id') id: string) {

        const technical = await this._bussinessPartnerService.getTechnicalById(id);

        if (!technical) {
            res.status(HttpStatus.OK).json({
                message: 'NotExists'
            });
        } else {
            res.status(HttpStatus.OK).json({
                message: 'OK',
                technical
            });
        }

    }


    @Get()
    async getBussinessPartners(@Res() res, @Query('all') all: string ) {

        const bps = await this._bussinessPartnerService.getAll(all);

        res.status(HttpStatus.OK).json({
            bps
        });

    }

    @Post()
    @ApiBody({ type: CreateBussinessPartnerDTO })
    async createBussinessPartner(@Res() res, @Body() bp: CreateBussinessPartnerDTO) {

        const bpCreated = await this._bussinessPartnerService.create(bp);

        res.status(HttpStatus.CREATED).json({
            message: 'Bussiness Partner successfully created',
            bpCreated
        });

    }

    @Put(':id')
    @ApiBody({ type: CreateBussinessPartnerDTO })
    async updateBussinessPartner(@Res() res, @Param('id') id: string, @Body() bp: CreateBussinessPartnerDTO) {

        const bpUpdated = await this._bussinessPartnerService.update(id, bp);

        res.status(HttpStatus.OK).json({
            message: 'Bussiness Partner successfully modified',
            bpUpdated
        });

    }

    @Delete(':id')
    async deleteBussinessPartner(@Res() res, @Param('id') id: string) {

        const bpDeleted = await this._bussinessPartnerService.delete(id);

        res.status(HttpStatus.OK).json({
            message: 'Bussiness Partner successfully removed',
            bpDeleted
        });

    }

}
