import { Controller, Post, Body, Get, NotFoundException, Put, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ObjectiveUserDto} from './dto/objective.dto';
import { ObjectiveService } from './objectives.service';

@Controller('objective')
export class ObjectivesController {
  constructor(private readonly objectiveService: ObjectiveService) {}

  // create
  @Post('/create')
  async create(@Body() objectiveDto: ObjectiveUserDto) {
    const objective = this.objectiveService.create(objectiveDto);
    if (!objective) {
      throw new NotFoundException('Objective not created');
    }
    return objective;
  }

  @Get('/allObjectivesByUser/:id')
  async getAllObjectives(@Param('id') id: string) {
    
    try {
      const objectives = await this.objectiveService.getObjectivesByUser(id); // Llama al servicio para obtener todos los objetivos de este usuario
      return objectives;
    } catch (error) {
      throw new HttpException('Error obteniendo los objetivos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/getObjectiveById/:id')
  async getObjectiveById(@Param('id') id: string) {
    
    try {
      const objective = await this.objectiveService.getObjectiveById(id); // Llama al servicio para obtener todos los objetivos de este usuario
      return objective;
    } catch (error) {
      throw new HttpException('Error obteniendo los objetivos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}