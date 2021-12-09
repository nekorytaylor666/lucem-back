import { AggregationCursor, FindCursor } from 'mongodb';

export async function paginate<T>(args: {
    cursor: AggregationCursor<T> | FindCursor<T>;
    page: number;
    elementsPerPage: number;
}): Promise<T[]> {
    const { cursor, page, elementsPerPage } = args;
    const paginatedResult = await cursor
        .skip((page - 1) * elementsPerPage)
        .limit(elementsPerPage)
        .toArray();
    return paginatedResult;
}
