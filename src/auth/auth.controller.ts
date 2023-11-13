import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.createUser(signInDto.username, signInDto.password);
  }
  @Post('login')
  signIn2(@Body() signInDto: Record<string, any>) {
    return this.authService.findUser(signInDto.username, signInDto.password);
  }
}