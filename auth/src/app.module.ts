import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AuthSessionMiddleware,
  RequiredAuthMiddleware,
} from './middleware/auth.middleware';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://auth-mongo-service:27017/auth'),
    MongooseModule.forRoot('mongodb://localhost:27017/auth'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthSessionMiddleware).forRoutes('users');
    consumer
      .apply(RequiredAuthMiddleware)
      .exclude({ path: 'users/signin', method: RequestMethod.POST })
      .forRoutes('users');
  }
}
