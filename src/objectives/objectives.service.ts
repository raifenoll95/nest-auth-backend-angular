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

  //Devuelve todos los objetivos de un usuario
  async getObjectivesByUser(id: string): Promise<Objectives[]> {
    const objectives = await this.objectivesModel.find({ idUser: id });
    return objectives;
  }

  //Devuelve un objetivo
  async getObjectiveById(id: string): Promise<Objectives> {
    const objective = await this.objectivesModel.findById(id);
    return objective;
  }
}
