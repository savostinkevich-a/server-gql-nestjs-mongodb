import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model, Types } from 'mongoose';
import { RegistrationInput } from '../auth/dto/registration.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdateUserPostsInput } from './dto/update-user-posts.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  public getUserById(_id: Types.ObjectId): Promise<User> {
    return this.userModel.findById(_id).exec()
  }

  public getUserFiltered(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  public getUserByLogin(login: string): Promise<User> {
    return this.userModel.findOne({login: login}).exec()
  }

  public createUser(registrationData: RegistrationInput){
    const user = new this.userModel(registrationData)
    return user.save()
  }

  public async updateUser(userId, updateUserData: UpdateUserInput): Promise<User> {
      return await this.userModel.findByIdAndUpdate(userId, updateUserData, {new: true}).exec()
  }

  public async deleteUser(userId, _id: Types.ObjectId){
    if (userId.toHexString() === _id) {
      return await this.userModel.findByIdAndRemove(_id).exec()
    }
    throw new Error('Так нельзя')
  }

  public async updateUserPosts(userId, updateUserPostsData: UpdateUserPostsInput): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, {$push: {posts: updateUserPostsData.post}})
  }

  public async deleteUserPosts(userId, _id: Types.ObjectId): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, {$pull: {posts: _id}})
  }
}
