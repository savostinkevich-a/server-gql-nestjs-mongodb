import { Field, InputType } from '@nestjs/graphql';
import { Roles } from '../enum/roles.enum';

@InputType()
export class RegistrationInput {
  @Field()
  login: string

  @Field()
  password: string

  @Field({nullable: true})
  firstName?: string

  @Field({nullable: true})
  lastName?: string

  @Field(() => [Roles])
  role: Roles[]
}