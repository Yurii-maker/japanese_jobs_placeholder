import { Request, Response } from 'express';

import { positionService, emailService } from '../services';
import { IPosition } from '../entity';
import { messages } from '../constants';

class PositionController {
    public async getAllPositions(req: Request, res: Response)
        :Promise<Response<IPosition[]>|undefined> {
        try {
            let allPositions = await positionService.getAllPositions();
            if (req.query) {
                allPositions = positionService
                    .filterPositionsByQuery(req.query, allPositions as IPosition[]);
            }
            return res.json(allPositions).status(200);
        } catch (e) {
            console.error(e);
        }
    }

    public async getPosition(req: Request, res: Response):Promise<Response<IPosition>|undefined> {
        try {
            const { id } = req.params;
            const position = await positionService.getPosition(+id);
            return res.json(position).status(200);
        } catch (e) {
            console.error(e);
        }
    }

    public async createPosition(req: Request, res: Response)
        :Promise<Response<IPosition>|undefined> {
        try {
            const savedPosition = await positionService.createPosition(req.body);
            const {
                category,
                level,
                japaneseRequired,
            } = req.body;
            await emailService.mailSendingNewPosition(
                category,
                level,
                japaneseRequired,
                messages.newPositionSubject,
                messages.newPropositionWithoutJapanese(category, level),
                messages.newPropositionWithJapanese(category, level),
            );
            return res.json(savedPosition).status(201);
        } catch (e) {
            console.error(e);
        }
    }

    public async updatePosition(req: Request, res: Response):Promise<Response|undefined> {
        try {
            const { id } = req.params;
            await positionService.updatePosition(+id, req.body);
            return res.sendStatus(200);
        } catch (e) {
            console.error(e);
        }
    }

    public async deletePosition(req: Request, res: Response):Promise<Response|undefined> {
        try {
            const { id } = req.params;
            await emailService.mailSendingRemovePosition(
                +id,
                messages.positionRemoveSubject,
                messages.propositionWithoutJapaneseRemoved,
                messages.propositionWithJapaneseRemoved,
            );
            await positionService.deletePosition(+id);
            return res.sendStatus(200);
        } catch (e) {
            console.error(e);
        }
    }
}

export const positionController = new PositionController();
