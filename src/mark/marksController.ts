import { Controller, Post, Body, Get, NotFoundException, Put, HttpException, HttpStatus, Param } from '@nestjs/common';
import { MarkObjectiveDto } from './dto/mark.dto';
import { MarksService } from './marks.service';

@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  // create
  @Post('/create')
  async create(@Body() markDto: MarkObjectiveDto) {
    const mark = this.marksService.create(markDto);
    if (!mark) {
      throw new NotFoundException('Objective not created');
    }
    return mark;
  }

//   @Get('/allObjectivesByUser/:id')
//   async getAllObjectives(@Param('id') id: string) {
    
//     try {
//       const objectives = await this.objectiveService.getObjectivesByUser(id); // Llama al servicio para obtener todos los objetivos de este usuario
//       return objectives;
//     } catch (error) {
//       throw new HttpException('Error obteniendo los objetivos', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @Get('/getObjectiveById/:id')
//   async getObjectiveById(@Param('id') id: string) {
    
//     try {
//       const objective = await this.objectiveService.getObjectiveById(id); // Llama al servicio para obtener todos los objetivos de este usuario
//       return objective;
//     } catch (error) {
//       throw new HttpException('Error obteniendo los objetivos', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
}