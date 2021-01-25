import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegistrationInput } from './dto/registration.input';
import { LoginInput } from './dto/login.input';
import { AuthToken } from './modules/auth-token.model';
import { Types } from 'mongoose';
import { JwtDto } from './dto/jwt.dto';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }


  public async login(loginData: LoginInput): Promise<AuthToken> {
    const user = await this.usersService.getUserByLogin(loginData.login);

    let isMatch: boolean;
    if (user) {
      isMatch = await bcrypt.compare(loginData.password, user.password);
    } else {
      isMatch = false;
    }

    if (user && isMatch) {
      return { user, token: this.signToken(user._id) };
    }

    throw new Error('Неправильные данные');
  }

  public async register(registerData: RegistrationInput): Promise<AuthToken> {
    const user = await this.usersService.getUserByLogin(registerData.login);
    if (!user) {
      const hashedPassword = await bcrypt.hash(registerData.password, 10);
      const created = await this.usersService.createUser({ ...registerData, password: hashedPassword });
      return { user: created, token: this.signToken(created._id) };
    }
    throw new Error(`Пользователь с именем ${registerData.login} уже есть!`);
  }

  async validateUser(_id: Types.ObjectId) {
    return this.usersService.getUserById(_id);
  }

  private signToken(_id: Types.ObjectId) {
    const payload: JwtDto = { _id };
    return this.jwtService.sign(payload);
  }
}
