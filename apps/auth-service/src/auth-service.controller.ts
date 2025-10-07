import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { LoginDto } from '@app/common/dto';
import { YupValidationPipe } from '@app/common/pipes';
import { loginUserSchema } from '@app/common/validators/auth.validators';
import { JwtAuthGuard } from '@app/common/gaurds';
import { RolesGuard } from '@app/common/gaurds/roles.guard';
import { Roles } from '@app/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body(new YupValidationPipe(loginUserSchema)) body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('refresh')
  refresh(@Body('refreshToken') token: string) {
    return this.authService.refreshToken(token);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return {
      data: req.user,
      message: 'User profile retrieved successfully',
      status: true,
    };
  }

  @Get('admin')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  adminRoute(@Req() req) {
    return { message: 'Hello Admin', user: req.user };
  }
}
