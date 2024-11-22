import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { ProfileUserDto } from './dto/profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {

  //Con esto ya puedo interactuar con el esquema users
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>
  ) {}

  // Crea un usuario
  async create(profileDto: ProfileUserDto): Promise<Profile> {
    try {
      // 1 Encriptar la password
      const profile = profileDto;
      const newProfile = new this.profileModel(profile);

      await newProfile.save();
      const profileSaved = newProfile.toJSON();
      return profileSaved;
    } 
    catch(error)
    {
    //   if(error.code === 'E11000') {
    //     throw new BadRequestException(`${createUserDto.email} already exists`);
    //   }
      throw new InternalServerErrorException('Something terrible happen!!!');
    }
  }

  //Obten el perfil de un usuario
  async findProfileByEmail(email: string) {
    const profile = await this.profileModel.findOne({email});
    return profile ? profile.toJSON() : null;
  }

  // Actualizar un perfil
  async update(id: string, profileDto: ProfileUserDto): Promise<Profile> {
    try {
      // Intentamos buscar el perfil por su ID
      const updatedProfile = await this.profileModel.findByIdAndUpdate(id, profileDto, {
        new: true, // Devuelve el perfil actualizado
        runValidators: true, // Ejecuta las validaciones antes de guardar
      });

      // Si no se encontró el perfil, lanzamos un error
      if (!updatedProfile) {
        throw new BadRequestException('Perfil no encontrado');
      }

      return updatedProfile;
    } catch (error) {
      throw new InternalServerErrorException('No se pudo actualizar el perfil');
    }
  }
}
