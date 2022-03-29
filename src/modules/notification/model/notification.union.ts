import { createUnionType } from '@nestjs/graphql';
import { BookingGraph } from 'src/modules/booking/model/booking.model';
import { CommentGraph } from 'src/modules/comment/model/comment.model';

export const NotificationDataUnion = createUnionType({
    types: () => [CommentGraph, BookingGraph],
    name: 'NotificationDataUnion',
});

export type NotificationDataGraphs = BookingGraph | CommentGraph;
