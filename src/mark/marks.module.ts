import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MarksController } from './marksController';
import { MarksService } from './marks.service';
import { Marks, MarksSchema } from './entities/mark.entity';

@Module({
  controllers: [MarksController],
  providers: [MarksService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Marks.name,
        schema: MarksSchema
      }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),
  ]
})
export class MarksModule {}
