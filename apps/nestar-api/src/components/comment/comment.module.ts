import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [

    ],
    providers: [CommentResolver, CommentService]
})
export class CommentModule { }
