import { Controller, Get, Res, Param, HttpStatus, Post, Body, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {

    /**
     *
     */
    constructor(
        private readonly _orderService: OrderService
    ) { }

    @Get(':id')
    async getOrder(@Res() res, @Param('id') id: string) {

        const order = await this._orderService.get(id);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            order
        });

    }

    @Get()
    async getOrders(@Res() res) {

        const orders = await this._orderService.getAll();

        res.status(HttpStatus.OK).json({
            orders
        });

    }

    @Post()
    async createOrder(@Res() res, @Body() order: CreateOrderDTO) {

        const orderCreated = await this._orderService.create(order);

        res.status(HttpStatus.CREATED).json({
            message: 'OK',
            orderCreated
        });
    }

    @Put(':id')
    async updateOrder(@Res() res, @Param('id') id: string, @Body() order: CreateOrderDTO) {

        const orderUpdated = await this._orderService.update(id, order);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            orderUpdated
        });

    }

    @Delete(':id')
    async deleteOrder(@Res() res, @Param('id') id: string) {

        const orderDeleted = await this._orderService.delete(id);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            orderDeleted
        });

    }
}
