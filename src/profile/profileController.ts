import { Controller, Post, Body, UseInterceptors, UploadedFile, Param, Get, NotFoundException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileUserDto } from './dto/profile.dto';
import 'multer';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // Crear un perfil de usuario
  @Post('/create')
  async create(@Body() profileDto: ProfileUserDto) {
    const profile = this.profileService.create(profileDto);
    if (!profile) {
      throw new NotFoundException('Profile not created');
    }
    return profile;
  }

  // Obtener el perfil por email
  @Get('email/:email')
  async getProfile(@Param('email') email: string) {
    const profile = await this.profileService.findProfileByEmail(email);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }
}
