import { Field, InputType } from '@nestjs/graphql';
import { Categories } from '../enums/category.enum';

@InputType()
export class FilterBPostInput {
  @Field(() => Categories, {nullable: true})
  category?: Categories
}