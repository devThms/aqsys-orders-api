import { Controller, Get, Res, Param, HttpStatus, Post, Body, Put, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dtos/create-customer.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {

    /**
     *
     */
    constructor(
        private readonly _customerService: CustomerService
    ) { }

    @Get(':id')
    async getCustomer(@Res() res, @Param() id: string) {

        const customer = await this._customerService.get(id);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            customer
        });

    }

    @Get()
    async getCustomers(@Res() res) {

        const customers = await this._customerService.getAll();

        res.status(HttpStatus.OK).json({
            customers
        });

    }

    @Post()
    @ApiBody({ type: CreateCustomerDTO })
    async createCustomer(@Res() res, @Body() customer: CreateCustomerDTO) {

        const customerCreated = await this._customerService.create(customer);

        res.status(HttpStatus.CREATED).json({
            message: 'OK',
            customerCreated
        });

    }

    @Put(':id')
    @ApiBody({ type: CreateCustomerDTO })
    async updateCustomer(@Res() res, @Param() id: string, @Body() customer: CreateCustomerDTO) {

        const customerUpdated = await this._customerService.update(id, customer);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            customerUpdated
        });

    }

    @Delete(':id')
    async deleteCustomer(@Res() res, @Param() id: string) {

        const customerDeleted = await this._customerService.delete(id);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            customerDeleted
        });
        
    }
}
