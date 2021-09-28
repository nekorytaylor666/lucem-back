import { Inject, Injectable } from '@nestjs/common';
import { AggregationCursor, Db, ObjectId } from 'mongodb';
import { AWSservice } from 'src/modules/helpers/uploadFiles/aws/AWS.service';
import { TestResultsAddictive } from '../model/testResults.addictive';
import { CreateTestResults } from '../model/testResults.args';
import { TestResults } from '../model/testResults.interface';

@Injectable()
export class TestResultsService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private database: Db,
        private photoUploadService: AWSservice,
    ) {}

    private get testResultsCollection() {
        return this.database.collection('testResults');
    }

    findCursorWithAddictives(args: {
        findFields: (keyof TestResults)[];
        findValues: any[];
    }): AggregationCursor<TestResultsAddictive> {
        const { findFields, findValues } = args;
        const findQuery: any = {};
        findFields.map((val, ind) => {
            findQuery[val] = findValues[ind];
        });
        const testResultsCursor = this.testResultsCollection.aggregate<TestResultsAddictive>([
            {
                $match: findQuery,
            },
            {
                $lookup: {
                    from: 'booking',
                    let: {
                        bookingId: '$bookingId'
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$_id', '$$bookingId']
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'service',
                                localField: 'serviceId',
                                foreignField: '_id',
                                as: 'service'
                            }
                        },
                        {
                            $lookup: {
                                from: 'doctor',
                                localField: 'doctorId',
                                foreignField: '_id',
                                as: 'doctor'
                            }
                        },
                        {
                            $lookup: {
                                from: 'user',
                                localField: 'userId',
                                foreignField: '_id',
                                as: 'user'
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                doctor: {
                                    $arrayElemAt: ['$doctor', 0]   
                                },
                                service: {
                                    $arrayElemAt: ['$service', 0]
                                },
                                startDate: 1,
                                endDate: 1,
                            }
                        }
                    ]
                },
            },
            {
                $lookup: {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $project: {
                    _id: 1,
                    date: 1,
                    title: 1,
                    description: 1,
                    photoURL: 1,
                    user: { $arrayElemAt: ['$user', 0] },
                    booking: { $arrayElemAt: ['$booking', 0] },
                },
            },
        ]);
        return testResultsCursor;
    }

    async create(args: CreateTestResults): Promise<TestResults> {
        const {
            description,
            title,
            files: _files,
            userId: _userId,
            bookingId: _bookingId
        } = args;
        const [bookingId, userId, currentDate] = [
            new ObjectId(_bookingId),
            new ObjectId(_userId),
            new Date()
        ]
        const files = await _files;
        const fileURLs = await Promise.all(
            files.map((val) => {
                return this.photoUploadService.saveImages(
                    val.createReadStream(),
                );
            }),
        );
        const testResults: TestResults = {
            userId,
            bookingId,
            title,
            description,
            date: currentDate,
            photoURL: fileURLs,
        };
        const insertTestResults = await this.testResultsCollection.insertOne(
            testResults,
        );
        testResults._id = insertTestResults.insertedId;
        return testResults;
    }
}
