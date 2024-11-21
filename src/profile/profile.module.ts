import { Module } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ProfileController } from './profileController';
import { ProfileService } from './profile.service';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { Profile, ProfileSchema } from './entities/profile.entity';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Profile.name,
        schema: ProfileSchema
      }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),
  ]
})
export class ProfileModule {}
