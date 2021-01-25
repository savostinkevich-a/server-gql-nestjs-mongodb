import { Field, InputType } from '@nestjs/graphql';
import { Categories } from '../enums/category.enum';
import { Types } from 'mongoose';

@InputType()
export class UpdateBPostInput {
  @Field(() => String)
  _id: Types.ObjectId

  @Field({nullable: true})
  title?: string

  @Field(() => Categories, {nullable: true})
  category?: Categories
}