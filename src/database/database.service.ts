import { TypeOrmModule }from "@nestjs/typeorm";

import {
    ConnectionOptions
}
from "typeorm";

/* Archivos de configuración */
import {
    ConfigModule
}
from '../config/config.module';
import {
    ConfigService
}
from '../config/config.service';
import {
    Configuration
}
from '../config/config.keys';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({ 
        imports: [ConfigModule], 
        inject: [ConfigService], 
        async useFactory(config: ConfigService) { 
            return { 
                ssl: false, 
                type: config.get(Configuration.DB_TYPE), 
                host: config.get(Configuration.DB_HOST), 
                port: config.get(Configuration.DB_PORT), 
                username: config.get(Configuration.DB_USER), 
                password: config.get(Configuration.DB_PASSWORD), 
                database: config.get(Configuration.DB_NAME), 
                entities: [__dirname + '/../**/*.entity{.ts,.js}'], 
                migrations: [__dirname + '/migrations/*{.ts,.js}'], 
                synchronize: false, 
            } as ConnectionOptions; 
        }, 
    }) 
]
