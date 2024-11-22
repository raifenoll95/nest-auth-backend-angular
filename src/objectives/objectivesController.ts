import { Controller, Post, Body, Get, NotFoundException, Put, HttpException, HttpStatus } from '@nestjs/common';
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

  @Get('/allObjectives')
  async getAllObjectives() {
    
    try {
      const objectives = await this.objectiveService.getAll(); // Llama al servicio para obtener todos los objetivos
      return objectives;
    } catch (error) {
      throw new HttpException('Error obteniendo los objetivos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}