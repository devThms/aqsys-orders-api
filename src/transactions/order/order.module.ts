import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderRepository]),
    ],
    providers: [OrderService],
    controllers: [OrderController]
})
export class OrderModule {}
