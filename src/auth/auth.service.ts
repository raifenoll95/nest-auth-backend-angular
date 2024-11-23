import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileUserDto } from './dto/update-user';

@Injectable()
export class AuthService {

  // Con esto ya puedo interactuar con el esquema users
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ) {}
  
  // Crea un usuario
  async create(createUserDto: CreateUserDto): Promise<User> {

    try {

      // 1 Encriptar la password
      const {password,...userData} = createUserDto;
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });

      await newUser.save();
      const {password:_, ...user} = newUser.toJSON();
      return user;
    } 
    catch(error)
    {
      if(error.code === 'E11000') {
        throw new BadRequestException(`${createUserDto.email} alreadyv exists`);
      }
      throw new InternalServerErrorException('Something terrible happen!!!');
    }
  }

  // Registrar Usuario
  async register(registerDto: RegisterDto): Promise<LoginResponse> {

    //me lo acepta por las mismas propiedades
    const user = await this.create(registerDto);

    return {
      user: user,
      token: this.getJwToken({id: user._id})
    }
  }
  
  async login(loginDto: LoginDto): Promise<LoginResponse> {

    const {email, password} = loginDto;
    const user = await this.userModel.findOne({email: email });
    if(!user) {
      throw new UnauthorizedException('Email not valid');
    }

    if(!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales no validas')
    }

    const {password:_, ...rest} = user.toJSON();

    return {
      user: rest,
      token: this.getJwToken({id: user.id}),
    }
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserByid(id: string) {
    const user = await this.userModel.findById(id);
    const {password, ...rest} = user.toJSON();
    return rest;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  //El jwt payload algo raro
  getJwToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  //Obten un usuario por su ID.
  async getUser(id: string) {
    const user = await this.userModel.findById(id);
    console.log(user.toJSON());
    return user ? user.toJSON() : null;
  }

  // Actualizar un usuario
  async update(id: string, userDto: UpdateProfileUserDto): Promise<User> {
    try {
      // Intentamos buscar el perfil por su ID
      const updatedUser = await this.userModel.findByIdAndUpdate(id, userDto, {
        new: true, // Devuelve el perfil actualizado
        runValidators: true, // Ejecuta las validaciones antes de guardar
      });

      // Si no se encontró el perfil, lanzamos un error
      if (!updatedUser) {
        throw new BadRequestException('Perfil no encontrado');
      }

      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('No se pudo actualizar el perfil');
    }
  }
}
