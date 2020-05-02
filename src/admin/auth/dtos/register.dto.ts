import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class RegisterDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly userName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;

}