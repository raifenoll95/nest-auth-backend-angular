import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class ProfileUserDto {
    
    @IsString()
    name: string;
    
    @IsNumber()
    @IsOptional()
    age?: number;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsNumber()
    @IsOptional()
    height?: number;

    @IsNumber()
    @IsOptional()
    weight?: number;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    specialty?: string;

    @IsString()
    @IsOptional()
    photo?: string;  // Guardará el nombre del archivo de la foto
}