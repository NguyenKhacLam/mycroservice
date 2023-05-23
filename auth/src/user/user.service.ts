import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getCurrentUser() {
    return 'getCurrentUser';
  }

  getOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  signIn() {
    return 'SignIn';
  }

  signUp(body: UserDto) {
    const newUser = new this.userModel(body);

    return newUser.save();
  }

  signOut() {
    return 'signOut';
  }
}
