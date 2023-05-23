import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getCurrentUser() {
    return 'getCurrentUser';
  }

  signIn() {
    return 'SignIn';
  }
}
