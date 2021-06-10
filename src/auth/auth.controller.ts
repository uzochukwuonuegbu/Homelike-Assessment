import { Controller, Get, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
// import { AuthRoles } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

  @Post('register')
  // @AuthRoles()
  register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@Request() req) {
    return {
      user: this.authService.stripUser(req.user),
    };
  }
}
