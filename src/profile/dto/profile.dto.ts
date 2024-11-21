import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Transform } from 'class-transformer';

export class ProfileUserDto {
    
    @IsString()
    name: string;
    
    @IsNumber()
    @Transform(({ value }) => Number(value)) // Convierte el valor a un número
    age: number;

    @IsString()
    gender: string;

    @IsNumber()
    @Transform(({ value }) => Number(value)) // Convierte el valor a un número
    height: number;

    @IsNumber()
    @Transform(({ value }) => Number(value)) // Convierte el valor a un número
    weight: number;

    @IsEmail()
    email: string;

    @IsString()
    specialty: string;

    @IsString()
    @IsOptional()
    photo?: string;  // Guardará el nombre del archivo de la foto
}