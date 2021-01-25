import { Module } from '@nestjs/common';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BPost, BPostSchema } from './models/b-post.model';

@Module({
  imports: [UsersModule,
    MongooseModule.forFeature([{name: BPost.name, schema: BPostSchema}])
  ],
  providers: [BlogResolver, BlogService]
})
export class BlogModule {}
