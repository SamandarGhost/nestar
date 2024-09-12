import { Module } from '@nestjs/common';
import { LikeResolver } from './like.resolver';
import { LikeService } from './like.service';

@Module({
  imports: [

  ],
  providers: [LikeResolver, LikeService]
})
export class LikeModule { }
