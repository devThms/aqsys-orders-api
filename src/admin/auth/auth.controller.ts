import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterDTO } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AuthController {

    /**
     *
     */
    constructor(
        private readonly _authservice: AuthService
    ) { }

    @Post('/register')
    @UsePipes(ValidationPipe)
    async register( @Body() user: RegisterDTO ) {

        return this._authservice.register( user );

    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login( @Body() user: LoginDTO ) {

        return this._authservice.login( user );

    }
}
