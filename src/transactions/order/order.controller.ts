import { Controller, Get, Res, Param, HttpStatus, Post, Body, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { ApiTags } from '@nestjs/swagger';

import { admin } from './firebase-config';
import { Technical } from '../../catalogs/technical/technical.entity';


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

        // const options = {
        //     priority: "high",
        //     timeToLive: 60 * 60 * 24,
        // };
        
        // TODO: Obtener el token del dispositivo del técnico
        // const technical: Technical = order.technical;
        // const deviceToken = 'technical.token'

        const orderCreated = await this._orderService.create(order);

        // const message = {
        //     notification: {
        //         title: 'Orden de Servicio',
        //         body: 'Se le asignó la siguiente orden de servicio: ' + orderCreated.id.substring(24)
        //     },
        // }
        

        // admin
        //     .messaging()
        //     .sendToDevice(deviceToken, message, options)
        //     .then((response) => {
        //       res.status(200).send("Notification sent successfully");
        //     })
        //     .catch((error) => {
        //       console.log(error);
        // });

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

    @Put(':id/confirm')
    async confirmOrder(@Res() res, @Param('id') id: string) {

        const orderConfirmed = await this._orderService.confirm(id);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            orderConfirmed
        });

    }

    @Put(':id/approve')
    async approveOrder(@Res() res, @Param('id') id: string) {

        const orderApproved = await this._orderService.approve(id);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            orderApproved
        });

    }

    @Put(':id/reject')
    async rejectOrder(@Res() res, @Param('id') id: string) {

        const orderRejected = await this._orderService.reject(id);

        res.status(HttpStatus.OK).json({
            message: 'OK',
            orderRejected
        });

    }
}
