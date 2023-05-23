import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

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

  @Post('signup')
  async signUp(@Body() body: UserDto) {
    const existedUser = await this.userService.getOneByEmail(body.email);

    if (existedUser) {
      throw new BadRequestException('User existed');
    }

    return this.userService.signUp(body);
  }

  @Post('signout')
  signOut() {
    return this.userService.signOut();
  }
}
