import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  Admin = 'admin',
  User = 'user',
  Author = 'author',
}

registerEnumType(Roles, { name: 'Roles'})