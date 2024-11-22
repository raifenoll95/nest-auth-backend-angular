import { Injectable, InternalServerErrorException} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectiveUserDto } from './dto/objective.dto';
import { Objectives } from './entities/objective.entity';

@Injectable()
export class ObjectiveService {

  //Con esto ya puedo interactuar con el esquema users
  constructor(@InjectModel(Objectives.name) private objectivesModel: Model<Objectives>) {}

  //Crea un objetivo
  async create(objectiveDto: ObjectiveUserDto): Promise<Objectives> {
    try {
      const objective = objectiveDto;
      const newObjective = new this.objectivesModel(objective);

      await newObjective.save();
      return newObjective.toJSON();
    } 
    catch(error)
    {
      throw new InternalServerErrorException('Something terrible happen!!!');
    }
  }

  //Devuelve todos los objetivos
  async getAll(): Promise<Objectives[]> {
    try {
      // Usa Mongoose para obtener todos los documentos en la colección
      const objectives = await this.objectivesModel.find().exec();
      return objectives.map(obj => obj.toJSON()); // Opcional: convertirlos a objetos JSON simples
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch objectives.');
    }
  }
}
