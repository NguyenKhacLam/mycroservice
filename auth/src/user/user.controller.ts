import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('currentuser')
  getCurrentUser() {
    return this.userService.getCurrentUser();
  }

  @Post('signin')
  signIn() {
    return this.userService.signIn();
  }

  @Post('signup')
  @HttpCode(201)
  async signUp(@Body() body: UserDto, @Session() session: Record<string, any>) {
    const existedUser = await this.userService.getOneByEmail(body.email);

    if (existedUser) {
      throw new BadRequestException('User existed');
    }

    const newUser = await this.userService.signUp(body);

    // Add jwt -> store in session
    const jwt = this.jwtService.sign({
      id: newUser._id,
      email: newUser.email,
    });

    session.jwt = jwt;

    return plainToClass(UserDto, newUser, { excludeExtraneousValues: true });
  }

  @Post('signout')
  signOut() {
    return this.userService.signOut();
  }
}
