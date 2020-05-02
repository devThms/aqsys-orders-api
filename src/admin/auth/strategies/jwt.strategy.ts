import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '../../../config/config.service';
import { Configuration } from '../../../config/config.keys';
import { AuthRepository } from '../auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../jwt-payload.interface';
import { Status } from 'src/common/status.enum';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    /**
     *
     */
    constructor(
        private readonly _configService: ConfigService,
        @InjectRepository(AuthRepository)
        private readonly _authRepo: AuthRepository
    ) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: _configService.get(Configuration.JWT_SECRET)
            }
        );
    }

    async validate( payload: IJwtPayload ) {
        
        const { username } = payload;

        const user = await this._authRepo.findOne({
            where: { userName: username, status: Status.ACTIVE }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return payload
    }
}