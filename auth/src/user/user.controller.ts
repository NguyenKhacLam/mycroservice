import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { IsLoginGuard } from 'src/guards/isLogin.guard';
import { Password } from 'src/utils/password';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('currentuser')
  // @UseGuards(IsLoginGuard)
  getCurrentUser(@Session() session: Record<string, any>) {
    try {
      console.log(session);

      return {
        currentUser: session.user || null,
      };
    } catch (error) {
      console.log(error);
      // throw new InternalServerErrorException('Something went wrong!');
      return { currentUser: null };
    }
  }

  @Post('signin')
  async signIn(@Body() body: UserDto, @Session() session: Record<string, any>) {
    const existedUser = await this.userService.getOneByEmail(body.email);

    if (!existedUser) {
      throw new BadRequestException('User not existed');
    }

    const passwordMatched = await Password.compare(
      existedUser.password,
      body.password,
    );

    if (!passwordMatched) {
      throw new BadRequestException('Password is not matched');
    }

    const jwt = this.jwtService.sign({
      id: existedUser._id,
      email: existedUser.email,
    });

    session.jwt = jwt;

    return plainToClass(UserDto, existedUser, {
      excludeExtraneousValues: true,
    });
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
  @UseGuards(IsLoginGuard)
  signOut(@Session() session: Record<string, any>) {
    session.jwt = null;
    session.user = null;

    return {};
  }
}
