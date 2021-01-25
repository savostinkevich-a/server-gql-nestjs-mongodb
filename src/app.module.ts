import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://andrey:rBi7099606@cluster0.0wcvh.mongodb.net/SiteDB?retryWrites=true&w=majority'),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
    }),
    AuthModule,
    UsersModule,
    BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
