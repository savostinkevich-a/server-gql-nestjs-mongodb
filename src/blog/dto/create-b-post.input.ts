import { Field, InputType } from '@nestjs/graphql';
import { Categories } from '../enums/category.enum';

@InputType()
export class CreateBPostInput {
  @Field()
  title: string

  @Field(() => Categories)
  category: Categories
}