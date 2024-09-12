import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ViewService } from '../view/view.service';
import { MemberService } from '../member/member.service';

@Injectable()
export class CommentService {
    constructor(@InjectModel('Comment') private readonly commetModel: Model<Comment>,
        private viewService: ViewService,
        private memberService: MemberService,
    ) { }
}
