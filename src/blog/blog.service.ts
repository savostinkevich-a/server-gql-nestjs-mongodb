import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BPost, BPostDocument } from './models/b-post.model';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { CreateBPostInput } from './dto/create-b-post.input';
import { Types } from 'mongoose';
import { FilterBPostInput } from './dto/filter-b-post.input';
import { UpdateBPostInput } from './dto/update-b-post.input';
import { AddBPostCommentInput } from './dto/add-b-post-comment.input';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BPost.name) private bPostModel: Model<BPostDocument>,
    private usersService: UsersService,
  ) {
  }

  public getBlogPost(_id: Types.ObjectId): Promise<BPost> {
    return this.bPostModel.findById(_id).exec();
  }

  public getFilteredBlogPosts(filter: FilterBPostInput): Promise<BPost[]> {
    return this.bPostModel.find({ ...filter }).exec();
  }

  public async createBPost(userId: Types.ObjectId, createBPostData: CreateBPostInput): Promise<BPost> {
    const post = await new this.bPostModel({ ...createBPostData, authorId: userId, dateOfCreation: Date.now() });
    await this.usersService.updateUserPosts(userId, { post: post._id });
    return post.save();
  }

  public async addComment(userId: Types.ObjectId, addBPostCommentData: AddBPostCommentInput): Promise<BPost> {
    return await this.bPostModel.findByIdAndUpdate(addBPostCommentData._id, {
      $push: {
        comments: {
          user: userId,
          comment: addBPostCommentData.comment,
          date: Date.now()
        },
      },
    }, {new: true}).exec();
  }

  public async updateBlogPost(userId, updateBlogPostData: UpdateBPostInput): Promise<BPost> {
    const post = await this.getBlogPost(updateBlogPostData._id);
    if (post.authorId._id.toHexString() === userId.toHexString()) {
      return await this.bPostModel.findByIdAndUpdate(updateBlogPostData._id, updateBlogPostData, { new: true }).exec();
    }
    throw new Error('Так нельзя');
  }

  public async deleteBlogPost(userId, _id: Types.ObjectId): Promise<BPost> {
    const post = await this.getBlogPost(_id);
    if (post.authorId._id.toHexString() === userId.toHexString()) {
      const deleted = await this.usersService.deleteUserPosts(userId, _id)
      return await this.bPostModel.findByIdAndRemove(_id).exec()
    }
    throw new Error('Так нельзя');
  }

}
