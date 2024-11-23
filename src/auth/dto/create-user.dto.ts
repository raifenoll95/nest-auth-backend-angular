import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @IsBoolean()
    perfil: boolean;
}
