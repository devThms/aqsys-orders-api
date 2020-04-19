import * as fs from "fs";
import { parse } from "dotenv";

export class ConfigService {

    private readonly envConfig: { [ key: string ] : string }

    /**
     *
     */
    constructor() {
        
        const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

        if (isDevelopmentEnv) {
            const envFilePath = __dirname + '/../../.env';
            const existPath = fs.existsSync(envFilePath);
      
            if (!existPath) {
              console.log('El archivo .env no existe en su aplicación.');
              process.exit(0);
            }
      
            this.envConfig = parse(fs.readFileSync(envFilePath));
        } else {
            this.envConfig = {
              SERVER_PORT: process.env.PORT,
            };
        }
        
    }

    /**
     * Devuelve el valor de la variable que le pasemos como parametro almacenada en el archivo .env.
     * @param key Nombre de la variable de configuración del archivo .env
     */
    get( key: string ) : string {
        return this.envConfig[ key ];
    }

}
