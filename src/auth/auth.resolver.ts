import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthToken } from './modules/auth-token.model';
import { LoginInput } from './dto/login.input';
import { RegistrationInput } from './dto/registration.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {
  }

  @Mutation(() => AuthToken)
  login(@Args('authLoginData') loginData: LoginInput){
    return this.authService.login(loginData)
  }

  @Mutation(() => AuthToken)
  register(@Args('authRegisterData') registerData: RegistrationInput){
    return this.authService.register(registerData)
  }
}
