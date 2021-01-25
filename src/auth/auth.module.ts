import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GqlAuthGuard } from './guards/gql-auth-guard';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: 'SECRET'
  })],
  providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard]
})
export class AuthModule {}
