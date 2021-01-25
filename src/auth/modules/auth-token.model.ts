import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class AuthToken {
  @Field()
  user: User

  @Field()
  token: string
}