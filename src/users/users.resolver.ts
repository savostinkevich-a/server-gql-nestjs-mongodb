import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, UserDocument } from './models/user.model';
import { Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth-guard';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUser } from '../auth/decorators/current-author.decorator';
import { BPost } from '../blog/models/b-post.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(
    @CurrentUser() user: User
  ):Promise<User> {
    return this.usersService.getUserById(user._id )
  }

  @Query(() => User)
  async getUserById(@Args(`_id`, { type: () => String }) _id: Types.ObjectId): Promise<User> {
    return this.usersService.getUserById(_id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Args(`updateUserData`) updateUserData: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(user._id, updateUserData);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async deleteUser(
    @CurrentUser() user: User,
    @Args(`_id`, {type: () => String}) _id: Types.ObjectId
  ): Promise<User> {
    return this.usersService.deleteUser(user._id, _id)
  }

  @ResolveField(() => BPost)
  async posts(
    @Parent() user: UserDocument,
    @Args(`populate`) populate: boolean
  ) {
    if (populate)
      await user
        .populate({ path: 'posts', model: BPost.name})
        .execPopulate()
    return user.posts
  }
}
