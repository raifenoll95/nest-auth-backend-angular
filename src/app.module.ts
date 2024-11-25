import { Module } from '@nestjs/common';;
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { ObjectiveModule } from './objectives/objectives.module';
import { MarksModule } from './mark/marks.module';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    ObjectiveModule,
    MarksModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME
    })
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
  
}
