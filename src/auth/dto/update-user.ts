import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';
export class UpdateProfileUserDto {
    @IsBoolean()
    perfil: boolean;
}