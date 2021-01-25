import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@ObjectType()
export class BPostComment {
  @Field(() => String)
  @Prop()
  comment: string

  @Field(() => User)
  @Prop({ type: () => Types.ObjectId, ref: 'User' })
  user: Types.ObjectId | User

  @Field(() => Number)
  @Prop()
  date: number
}