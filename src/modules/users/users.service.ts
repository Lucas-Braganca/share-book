import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { passwordSalt, tokenExpiration } from '../common/constants';
import { SigninRequestDto } from './dto/request/signin-request.dto';
import { SignupRequestDto } from './dto/request/signup-request.dto';
import { JwtPayload } from './dto/response/jwt-payload.interface';
import { JwtResponse } from './dto/response/jwt-response.interface';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  private logger = new Logger('Users Service');
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async signup(request: SignupRequestDto): Promise<User> {
    try {
      const { password, email } = request;
      await this.validateEmail(email);
      const newPassword = await bcrypt.hash(password, passwordSalt);
      const user = this.usersRepository.create({
        ...request,
        password: newPassword,
      });
      return this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async signin(request: SigninRequestDto) {
    const user = await this.validateUser(request);
    if (!user) {
      throw new UnauthorizedException('Invalid credencials');
    }

    return this.createJwtPayload(user);
  }

  private async createJwtPayload(user: User): Promise<JwtResponse> {
    const payload: JwtPayload = { userName: user.name, userId: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      expiresIn: tokenExpiration,
      accessToken,
    };
  }

  private async validateUser(request: SigninRequestDto): Promise<User> {
    const { email, password } = request;
    const user = await this.usersRepository.findOne({ email });
    if (user && (await this.validatePassword(user.password, password))) {
      return user;
    }
    return null;
  }

  private async validatePassword(userPassword: string, password: string) {
    return bcrypt.compare(password, userPassword);
  }

  private async validateEmail(email: string) {
    const userByEmail = await this.usersRepository.findOne({ email });
    if (userByEmail) {
      throw new BadRequestException('User with this email already exists');
    }
  }
}
