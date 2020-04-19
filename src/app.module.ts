import { Module }from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './admin/user/user.module';
import { RoleModule } from './admin/role/role.module';
import { BussinessPartnerModule } from './catalogs/bussiness-partner/bussiness-partner.module';
import { CustomerModule } from './catalogs/customer/customer.module';
import { TechnicalModule } from './catalogs/technical/technical.module';
import { OrderModule } from './transactions/order/order.module';
import { OrderDetailsModule } from './transactions/order-details/order-details.module';

@Module({ 
    imports: [
        ConfigModule, 
        DatabaseModule, 
        UserModule, 
        RoleModule, 
        BussinessPartnerModule, 
        CustomerModule, 
        TechnicalModule, 
        OrderModule, 
        OrderDetailsModule
    ], 
    controllers: [AppController], 
    providers: [AppService], 
}) 
export class AppModule {

    static port: number | string;

    /**
   *
   */
    constructor(private readonly _configService: ConfigService) {

        AppModule.port = this._configService.get(Configuration.SERVER_PORT);

    }

}
