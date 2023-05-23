import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  getCurrentUser() {
    return 'getCurrentUser';
  }

  signIn() {
    return 'SignIn';
  }

  signUp(body: UserDto) {
    return body;
  }

  signOut() {
    return 'signOut';
  }
}
