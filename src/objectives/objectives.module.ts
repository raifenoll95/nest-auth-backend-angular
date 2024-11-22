import { Module } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { ObjectiveService } from './objectives.service';
import { ObjectivesController } from './objectivesController';
import { Objectives, ObjectivesSchema } from './entities/objective.entity';

@Module({
  controllers: [ObjectivesController],
  providers: [ObjectiveService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Objectives.name,
        schema: ObjectivesSchema
      }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),
  ]
})
export class ObjectiveModule {}
