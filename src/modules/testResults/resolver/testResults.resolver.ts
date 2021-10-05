import { Controller, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Query, Int } from "@nestjs/graphql";
import { ObjectId } from "mongodb";
import { Roles } from "src/modules/helpers/auth/auth.roles";
import { CurrentRequestURLGraph, PreAuthGuard } from "src/modules/helpers/auth/auth.service";
import { paginate } from "src/utils/paginate";
import { CreateTestResults } from "../model/testResults.args";
import { TestResultsGraph } from "../model/testResults.model";
import { TestResultsService } from "../service/testResults.service";


@Resolver()
export class TestResultsResolver {
    constructor(private testResultsService: TestResultsService) {}

    @Mutation(() => TestResultsGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async createTestResults(
        @Args() args: CreateTestResults,
        @CurrentRequestURLGraph() req: string
        ) {
        const testResults = await this.testResultsService.create(args, req);
        const testResultsResponce = new TestResultsGraph({...testResults});
        return testResultsResponce;
    }

    @Query(() => [TestResultsGraph])
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async getTestResultsOfAUserWithAddictives(
        @Args('userId', { type: () => String}) userId: string,
        @Args('page', { type: () => Int}) page: number,
        ) {
        const testResultsCursor = this.testResultsService.findCursorWithAddictives({
            findFields: ['userId'],
            findValues: [new ObjectId(userId)]
        });
        const testResults = await paginate({ cursor: testResultsCursor, page, elementsPerPage: 10});
        const testResultsResponce = testResults.map((val) => new TestResultsGraph({...val}));
        return testResultsResponce;
    }

}