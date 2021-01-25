import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose'
import { User } from '../../users/models/user.model';
import { Categories } from '../enums/category.enum';
import { BPostComment } from './b-post-comment.model';

@ObjectType()
@Schema()
export class BPost {
  @Field(() => String)
  _id: Types.ObjectId

  @Field(() => String)
  @Prop()
  title: string

  @Field(() => Categories)
  @Prop({type: Categories})
  category: Categories

  @Field(() => User)
  @Prop({ type: () => Types.ObjectId, ref: 'User' })
  authorId: User

  @Field(() => [BPostComment], {nullable: true})
  @Prop({type: Types.ObjectId})
  comments?: Types.ObjectId[] | BPostComment[]

  @Field(() => Date)
  @Prop()
  dateOfCreation: Date
}

export type BPostDocument = BPost & Document

export const BPostSchema = SchemaFactory.createForClass(BPost)