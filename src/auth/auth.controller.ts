import { AuthUpdateRoleDto } from './dto/auth-role';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/users')
  getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Delete('/user/:id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.authService.deleteUser(id);
  }

  @Patch('/role')
  updateUserRole(@Body() authUpdateRoleDto: AuthUpdateRoleDto): Promise<void> {
    return this.authService.updateUserRole(authUpdateRoleDto);
  }
}
