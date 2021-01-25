import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { BPost, BPostDocument } from './models/b-post.model';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth-guard';
import { CreateBPostInput } from './dto/create-b-post.input';
import { CurrentUser } from '../auth/decorators/current-author.decorator';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { Types } from 'mongoose';
import { FilterBPostInput } from './dto/filter-b-post.input';
import { UpdateBPostInput } from './dto/update-b-post.input';
import { AddBPostCommentInput } from './dto/add-b-post-comment.input';

@Resolver(() => BPost)
export class BlogResolver {
  constructor(private blogService: BlogService, private usersService: UsersService) {
  }

  @Query(() => BPost)
  async getBlogPost(@Args(`_id`, {type: () => String}) _id: Types.ObjectId): Promise<BPost> {
    return this.blogService.getBlogPost(_id)
  }

  @Query(() => [BPost])
  async getFilteredBlogPosts(@Args(`filters`, {nullable: true}) filters: FilterBPostInput): Promise<BPost[]> {
    return this.blogService.getFilteredBlogPosts(filters)
  }

  @Mutation(() => BPost)
  @UseGuards(GqlAuthGuard)
  async createBlogPost(
    @CurrentUser() user: User,
    @Args(`createBlogPostData`) createBlogPostData: CreateBPostInput
  ): Promise<BPost> {
    return this.blogService.createBPost(user._id, createBlogPostData);
  }

  @Mutation(() => BPost)
  @UseGuards(GqlAuthGuard)
  async updateBlogPost(
    @CurrentUser() user: User,
    @Args(`updateBlogPostData`) updateBlogPostData: UpdateBPostInput
  ): Promise<BPost>{
    return this.blogService.updateBlogPost(user._id, updateBlogPostData)
  }

  @Mutation(() => BPost)
  @UseGuards(GqlAuthGuard)
  async addBlogPostComment(
    @CurrentUser() user: User,
    @Args(`addBlogPostCommentData`) addBlogPostCommentData: AddBPostCommentInput
  ): Promise<BPost> {
    return this.blogService.addComment(user._id, { ...addBlogPostCommentData})
  }

  @Mutation(() => BPost)
  @UseGuards(GqlAuthGuard)
  async deleteBlogPost(
    @CurrentUser() user: User,
    @Args(`_id`, {type: () => String}) _id: Types.ObjectId
  ): Promise<BPost> {
    return this.blogService.deleteBlogPost(user._id, _id)
  }

  @ResolveField(() => User)
  async authorId(
    @Parent() post: BPostDocument,
    @Args(`populate`) populate: boolean,
  ) {
    if (populate)
      await post
        .populate({ path: `authorId`, model: User.name })
        .execPopulate();
    return  post.authorId
  }
}
