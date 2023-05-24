import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { Password } from 'src/utils/password';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre('save', async function (done) {
            if (this.isModified('password')) {
              const hashed = await Password.toHash(this.get('password'));
              this.set('password', hashed);
            }

            done();
          });

          return schema;
        },
      },
    ]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '120s' },
      secret: 'lamnk',
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
