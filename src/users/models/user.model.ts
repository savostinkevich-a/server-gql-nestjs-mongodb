import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose'
import { BPost } from '../../blog/models/b-post.model';
import { Roles } from '../../auth/enum/roles.enum';


@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: Types.ObjectId

  @Field(() => String)
  @Prop()
  login: string

  @Field(() => String)
  @Prop()
  password: string

  @Field(() => [Roles])
  @Prop({type: Roles})
  role: Roles[]

  @Field(() => String, {nullable: true})
  @Prop()
  firstName?: string

  @Field(() => String, {nullable: true})
  @Prop()
  lastName?: string

  @Field(() => [BPost])
  @Prop({type: () => String, ref: 'BPost' })
  posts: Types.ObjectId[] | BPost[]
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)