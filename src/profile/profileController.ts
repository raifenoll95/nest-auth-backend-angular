import { Controller, Post, Body, Param, Get, NotFoundException, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileUserDto } from './dto/profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // create
  @Post('/create')
  async create(@Body() profileDto: ProfileUserDto) {
    const profile = this.profileService.create(profileDto);
    if (!profile) {
      throw new NotFoundException('Profile not created');
    }
    return profile;
  }

  // retrieve
  @Get('email/:email')
  async getProfile(@Param('email') email: string) {
    const profile = await this.profileService.findProfileByEmail(email);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  //update
  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() profileDto: ProfileUserDto) {
    return this.profileService.update(id, profileDto);
  }
  
}
