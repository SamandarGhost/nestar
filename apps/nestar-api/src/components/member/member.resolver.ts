import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberStatus, MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';

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
    @Query(() => String)
    public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
        console.log("Query checkAuth");
        console.log("MemberNick:", memberNick);
        return `Hi ${memberNick}`;
    };

    @Roles(MemberType.USER, MemberType.AGENT)
    @UseGuards(AuthGuard)
    @Query(() => String)
    public async checkAuthRoles(@AuthMember() authMember: Member): Promise<string> {
        console.log("Query checkAuth");
        console.log("MemberNick:",);
        return `Hi ${authMember.memberNick}, you are ${authMember.memberType} (memberId: ${authMember._id})`;
    };

    //  Authenticated
    @UseGuards(AuthGuard)
    @Mutation(() => Member)
    public async updateMember(
        @Args('input') input: MemberUpdate,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Member> {
        console.log('Mutation: updateMember');
        return this.memberService.updateMember(memberId, input);
    };

    @UseGuards(WithoutGuard)
    @Query(() => Member)
    public async getMember(@Args('memberId') input: string, @AuthMember('_id') memberId: ObjectId): Promise<Member> {
        console.log('Query: getMember');
        const targetId = shapeIntoMongoObjectId(input);
        return this.memberService.getMember(memberId, targetId);
    };

    /* ADMIN */

    // Authorization: ADMIN
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
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
