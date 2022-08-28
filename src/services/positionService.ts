import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IPosition, Position } from '../entity';
import { IPositionToUpdate, ISearchQuery } from '../interfaces';

@EntityRepository(Position)
class PositionService extends Repository<Position> {
    public async getAllPositions():Promise<IPosition[]|undefined> {
        return getManager()
            .getRepository(Position)
            .find();
    }

    public async getPosition(id:number):Promise<IPosition|undefined> {
        return getManager()
            .getRepository(Position)
            .findOne(id);
    }

    public async createPosition(position:IPosition):Promise<IPosition|undefined> {
        return getManager().getRepository(Position).save(position);
    }

    public async updatePosition(id:number, japaneseRequired:IPositionToUpdate)
        :Promise<UpdateResult|undefined> {
        return getManager().getRepository(Position).update(id, japaneseRequired);
    }

    public async deletePosition(id:number):Promise<DeleteResult|undefined> {
        return getManager().getRepository(Position).delete(id);
    }

    public filterPositionsByQuery(query: Partial<ISearchQuery>, positionsToFilter:IPosition[])
        :IPosition[] {
        const { category, level, tag } = query;

        if (category) {
            positionsToFilter = positionsToFilter
                .filter((position) => position.category === category);
        }
        if (level) {
            positionsToFilter = positionsToFilter
                .filter((position) => position.level === level);
        }
        if (tag) {
            positionsToFilter = positionsToFilter
                .filter((position) => position
                    .description?.includes(tag));
        }
        return positionsToFilter;
    }
}

export const positionService = new PositionService();
