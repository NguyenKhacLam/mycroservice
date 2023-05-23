import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('currentuser')
  getCurrentUser() {
    return this.userService.getCurrentUser();
  }

  @Post('signin')
  signIn() {
    return this.userService.signIn();
  }
}
