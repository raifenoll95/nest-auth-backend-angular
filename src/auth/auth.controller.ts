import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './interfaces/login-response';
import { User } from './entities/user.entity';
import { UpdateProfileUserDto } from './dto/update-user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  login( @Body() loginDto: LoginDto) {
    return this.authService.login( loginDto );
  }

  //post: register
  @Post('/register')
  register( @Body() registerDto: RegisterDto) {
    return this.authService.register( registerDto );
  }

  //update
  @Put('/updateProfileValue/:id')
  async update(@Param('id') id: string, @Body() updateProfileUserDto: UpdateProfileUserDto) {
    return this.authService.update(id, updateProfileUserDto);
  }

  //get
  @Get('/getUser/:id')
  async get(@Param('id') id: string) {
    const user = this.authService.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @UseGuards( AuthGuard )
  @Get()
  findAll( @Req() req: Request ) {
    return this.authService.findAll();
  }


  // LoginResponse
  @UseGuards( AuthGuard )
  @Get('check-token')
  checkToken( @Req() req: Request ): LoginResponse {
      
    const user = req['user'] as User;

    return {
      user,
      token: this.authService.getJwToken({ id: user._id })
    }
  }
}
