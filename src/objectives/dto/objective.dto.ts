import { IsNumber, IsString } from "class-validator";
import { Transform } from 'class-transformer';

export class ObjectiveUserDto {

    @IsString()
    idUser: string;
    
    @IsString()
    name: string;
    
    @IsNumber()
    @Transform(({ value }) => Number(value)) // Convierte el valor a un número
    reps: number;

    @IsNumber()
    @Transform(({ value }) => Number(value)) // Convierte el valor a un número
    weight: number;
}