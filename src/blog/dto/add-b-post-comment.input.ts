import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class AddBPostCommentInput {
  @Field(() => String)
  _id: Types.ObjectId

  @Field()
  comment: string
}