import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://auth-mongo-service:27017/auth_db'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
