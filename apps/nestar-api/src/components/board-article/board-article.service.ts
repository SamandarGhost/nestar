import { InjectModel } from '@nestjs/mongoose';
import { BoardArticle } from '../../libs/dto/board-article/board-article';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardArticleService {
    constructor(@InjectModel('BoardArticle') private readonly boardArticleModel: Model<BoardArticle>) { }
}
