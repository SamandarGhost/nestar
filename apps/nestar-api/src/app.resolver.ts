import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
    @Query(() => String)
    public sayHello(): String {
        return "GraphQL API server!"
    }
};