import { ObjectId } from 'bson';

export const shapeIntoMongoobjectId = (target: any) => {
    return typeof target === 'string' ? new ObjectId(target) : target;
};