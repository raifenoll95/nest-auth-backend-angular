import { Injectable, InternalServerErrorException} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Marks } from './entities/mark.entity';
import { MarkObjectiveDto } from './dto/mark.dto';

@Injectable()
export class MarksService {

  //Con esto ya puedo interactuar con el esquema users
  constructor(@InjectModel(Marks.name) private marksModel: Model<Marks>) {}

  //Crea una marca de objetivo
  async create(markDto: MarkObjectiveDto): Promise<Marks> {
    try {
      const mark = markDto;
      const newMark = new this.marksModel(mark);

      await newMark.save();
      return newMark.toJSON();
    } 
    catch(error)
    {
      throw new InternalServerErrorException('Something terrible happen!!!');
    }
  }

  //Devuelve todos los objetivos de un usuario
//   async getObjectivesByUser(id: string): Promise<Objectives[]> {
//     const objectives = await this.objectivesModel.find({ idUser: id });
//     return objectives;
//   }

//   //Devuelve un objetivo
//   async getObjectiveById(id: string): Promise<Objectives> {
//     const objective = await this.objectivesModel.findById(id);
//     return objective;
//   }
}
