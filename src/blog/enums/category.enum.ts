import { registerEnumType } from '@nestjs/graphql';

export enum Categories {
  Music = 'music',
  Art = 'art',
  Movie = 'movie',
}

registerEnumType(Categories, {name: 'Categories'})