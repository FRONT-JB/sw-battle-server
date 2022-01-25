import { AuthUpdateRoleDto } from './dto/auth-role';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async checkUserRole(userId: number): Promise<{ role: string }> {
    const foundUser = await this.userRepository.findOne({ id: userId });
    return { role: foundUser.role };
  }
  async updateUserRole(authUpdateRoleDto: AuthUpdateRoleDto): Promise<void> {
    const { id, role } = authUpdateRoleDto;
    const foundUser = await this.userRepository.findOne({ id });
    if (role === foundUser.role) {
      throw new ConflictException('is Conflict User Role');
    }
    const updateUser = {
      ...foundUser,
      role,
    };
    await this.userRepository.save(updateUser);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string; role: string }> {
    const { username, password } = authCredentialsDto;
    const foundUser = await this.userRepository.findOne({ username });
    const isMatched = await bcrypt.compare(password, foundUser.password);

    if (foundUser && isMatched) {
      const payload = { id: foundUser.id, username, role: foundUser.role };
      const accessToken = await this.jwtService.sign(payload);
      return { token: accessToken, role: foundUser.role };
    } else {
      throw new UnauthorizedException('login Failed');
    }
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find User with ${id}`);
    }
  }
}
