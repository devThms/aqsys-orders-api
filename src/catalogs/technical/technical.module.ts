import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalRepository } from './technical.repository';
import { TechnicalService } from './technical.service';
import { TechnicalController } from './technical.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([TechnicalRepository]),
    ],
    providers: [TechnicalService],
    controllers: [TechnicalController]
})
export class TechnicalModule {}
