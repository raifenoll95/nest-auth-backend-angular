import { IsDate, IsNumber, IsString } from "class-validator";
import { Transform } from 'class-transformer';

export class MarkObjectiveDto {

    @IsString()
    idUser: string;

    @IsString()
    idObjective: string;

    @IsNumber()
    @Transform(({ value }) => Number(value)) // Convierte el valor a un número
    reps: number;

    @IsNumber()
    @Transform(({ value }) => Number(value)) // Convierte el valor a un número
    weight: number;

    @IsDate()
    date: Date;

    @IsString()
    sensations: string;
}