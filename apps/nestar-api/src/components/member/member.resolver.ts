import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) { }

    @Mutation(() => Member)
    public async signup(@Args('input') input: MemberInput): Promise<Member> {
        console.log('Mutation: signup');
        console.log('input', input);
        return this.memberService.signup(input);
    };

    @Mutation(() => Member)
    public async login(@Args('input') input: LoginInput): Promise<Member> {
        console.log('Mutation: login');
        return this.memberService.login(input);
    };

    //  Authenticated
    @UseGuards(AuthGuard)
    @Mutation(() => String)
    public async updateMember(@AuthMember('_id') memberId: ObjectId): Promise<String> {
        console.log('Mutation: updateMember');
        return this.memberService.updateMember();
    };

    //  Authenticated
    @UseGuards(AuthGuard)
    @Query(() => String)
    public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
        console.log("Query checkAuth");
        console.log("MemberNick:", memberNick);
        return `Hi ${memberNick}`;
    };


    @Query(() => String)
    public async getMember(): Promise<String> {
        console.log('Query: getMember');
        return this.memberService.getMember();
    };

    /* ADMIN */

    // Authorization: ADMIN
    @Mutation(() => String)
    public async getAllMembersByAdmin(): Promise<String> {
        console.log('Mutation: getMembersByAdmin');
        return this.memberService.getMembersByAdmin();
    };

    // Authorization: ADMIN
    @Mutation(() => String)
    public async updateMemberByAdmin(): Promise<String> {
        console.log('Mutation: updateMemberByAdmin');
        return this.memberService.updateMemberByAdmin();
    };
};
