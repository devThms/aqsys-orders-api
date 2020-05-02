import { createParamDecorator } from "@nestjs/common";
import { ReadUserDTO } from '../user/dtos/read-user.dto';

export const GetUser = createParamDecorator( ( data, req ): ReadUserDTO => {
    return req.user
} );