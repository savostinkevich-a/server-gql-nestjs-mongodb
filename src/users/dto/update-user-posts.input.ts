import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class UpdateUserPostsInput {
  @Field(() => String, {nullable: true})
  post?: Types.ObjectId
}